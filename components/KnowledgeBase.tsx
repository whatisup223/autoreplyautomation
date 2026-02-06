import React, { useState, useEffect } from 'react';
import {
    BookOpen,
    Search,
    Plus,
    Filter,
    Trash2,
    Edit,
    Database,
    Bot,
    UploadCloud,
    FileText,
    X,
    CheckCircle2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { dbService } from '../services/dbService';
import Modal from './Modal';

interface KnowledgeItem {
    id: string;
    question: string;
    answer: string;
    tags: string[];
    status: 'active' | 'draft';
    lastUpdated: string;
}

const KnowledgeBase: React.FC = () => {
    const { t } = useTranslation();
    const [dragActive, setDragActive] = useState(false);
    const [items, setItems] = useState<KnowledgeItem[]>([]);
    const [search, setSearch] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<any>(null);
    const [formData, setFormData] = useState({ question: '', answer: '', tags: '' });

    useEffect(() => {
        setItems(dbService.getKB());
    }, []);

    const handleSaveEntry = () => {
        if (!formData.question || !formData.answer) return;
        const tagsArr = formData.tags.split(',').map(t => t.trim());
        dbService.saveKB(currentItem ? { ...currentItem, ...formData, tags: tagsArr } : { ...formData, tags: tagsArr, status: 'active', lastUpdated: 'Just now' });
        setItems(dbService.getKB());
        setIsModalOpen(false);
        setCurrentItem(null);
        setFormData({ question: '', answer: '', tags: '' });
    };

    const handleDelete = () => {
        if (currentItem) {
            dbService.deleteKB(currentItem.id);
            setItems(dbService.getKB());
            setIsDeleteModalOpen(false);
            setCurrentItem(null);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const fileName = e.dataTransfer.files[0].name;
            dbService.saveKB({
                question: `Info from ${fileName}`,
                answer: `Extracted content from ${fileName} (Simulated).`,
                tags: ['file-upload'],
                status: 'active',
                lastUpdated: 'Just now'
            });
            setItems(dbService.getKB());
        }
    };

    const filteredItems = items.filter(i =>
        i.question.toLowerCase().includes(search.toLowerCase()) ||
        i.answer.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">{t('kb_title')}</h2>
                    <p className="text-slate-600 text-sm font-semibold mt-1">{t('kb_subtitle')}</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white text-slate-900 border border-slate-200 px-5 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition flex items-center gap-2 shadow-sm">
                        <Bot size={18} className="text-purple-600" /> {t('train_ai')}
                    </button>
                    <button onClick={() => { setCurrentItem(null); setFormData({ question: '', answer: '', tags: '' }); setIsModalOpen(true); }} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-black transition flex items-center gap-2">
                        <Plus size={18} /> {t('add_entry')}
                    </button>
                </div>
            </div>

            {/* Upload Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 ml-4">
                    <UploadCloud size={20} className="text-blue-600" /> {t('upload_files_title')}
                </h3>
                <div
                    className={`relative border-2 border-dashed rounded-[2.5rem] p-12 text-center transition-all duration-300 ${dragActive ? 'border-blue-500 bg-blue-50/50 scale-[0.99]' : 'border-slate-200 hover:border-blue-300 bg-white/40 backdrop-blur-sm'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-lg shadow-blue-500/5 flex items-center justify-center text-blue-500 mb-2 group-hover:scale-110 transition duration-500">
                            <UploadCloud size={36} />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-slate-900">{t('drag_drop')}</p>
                            <p className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-wider">{t('supported_formats')}</p>
                        </div>
                        <label className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-black transition shadow-xl">
                            Select Files
                            <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && alert('Selected: ' + e.target.files[0].name)} />
                        </label>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-100 my-10"></div>

            {/* Manual Entries Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Database size={20} className="text-purple-600" /> {t('kb_title')} (Manual Entries)
                    </h3>

                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-auto rtl:left-4" size={20} />
                        <input
                            type="text"
                            placeholder={t('kb_search')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pr-12 pl-6 rtl:pr-6 rtl:pl-12 py-3 glass-input rounded-2xl text-sm font-bold outline-none shadow-sm"
                        />
                    </div>
                </div>

                {/* Content List */}
                <div className="grid gap-6">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="glass-card p-8 rounded-[2.5rem] hover:bg-white transition duration-500 group relative border border-white/50">
                            <div className="flex items-start gap-6">
                                <div className="mt-1 p-3 bg-purple-50 rounded-2xl text-purple-600 shadow-sm border border-purple-100">
                                    <BookOpen size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="text-xl font-bold text-slate-900">{item.question}</h4>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => { setCurrentItem(item); setFormData({ question: item.question, answer: item.answer, tags: item.tags.join(', ') }); setIsModalOpen(true); }}
                                                className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 transition border border-transparent hover:border-blue-100 shadow-sm group-hover:bg-white"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => { setCurrentItem(item); setIsDeleteModalOpen(true); }} className="p-2.5 hover:bg-red-50 rounded-xl text-slate-400 hover:text-red-600 transition border border-transparent hover:border-red-100 shadow-sm group-hover:bg-white"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium bg-slate-50/50 p-4 rounded-2xl border border-slate-100">{item.answer}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-white border border-slate-100 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-wider">#{tag}</span>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                            <CheckCircle2 size={12} className="text-emerald-500" /> Updated {item.lastUpdated}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* KB Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentItem ? t('edit') : t('add_entry')}
                footer={(
                    <button onClick={handleSaveEntry} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl">{t('save_changes')}</button>
                )}
            >
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Question</label>
                        <input type="text" value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Answer</label>
                        <textarea value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold h-32 resize-none" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tags (comma separated)</label>
                        <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" placeholder="support, general, pricing" />
                    </div>
                </div>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title={t('delete_file')}
                footer={(
                    <button onClick={handleDelete} className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-xl">Delete</button>
                )}
            >
                <p className="text-slate-600 font-bold">Are you sure you want to delete this knowledge entry?</p>
            </Modal>
        </div>
    );
};

export default KnowledgeBase;
