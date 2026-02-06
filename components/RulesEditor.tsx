import React, { useState, useEffect } from 'react';
import {
  Zap,
  Trash2,
  Plus,
  Settings,
  MessageSquare,
  Repeat,
  AlertTriangle,
  Play
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { dbService } from '../services/dbService';
import Modal from './Modal';

interface Rule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  executions: number;
}

const RulesEditor: React.FC = () => {
  const { t } = useTranslation();
  const [rules, setRules] = useState<Rule[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', trigger: '', action: '' });

  useEffect(() => {
    setRules(dbService.getRules());
  }, []);

  const handleSaveRule = () => {
    if (!formData.name) return;
    dbService.saveRule(currentRule ? { ...currentRule, ...formData } : { ...formData, enabled: true, executions: 0 });
    setRules(dbService.getRules());
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (currentRule) {
      dbService.deleteRule(currentRule.id);
      setRules(dbService.getRules());
      setIsDeleteModalOpen(false);
    }
  };

  const toggleRule = (rule: Rule) => {
    const updated = { ...rule, enabled: !rule.enabled };
    dbService.saveRule(updated);
    setRules(dbService.getRules());
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{t('rules_title')}</h2>
          <p className="text-slate-600 text-sm font-semibold mt-1">{t('rules_subtitle')}</p>
        </div>
        <button onClick={() => { setCurrentRule(null); setFormData({ name: '', trigger: '', action: '' }); setIsModalOpen(true); }} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-black transition flex items-center gap-2">
          <Plus size={18} /> {t('create_rule')}
        </button>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="glass-card p-6 rounded-[2rem] flex items-center gap-6 hover:bg-white transition duration-300 group">
            {/* Icon Status */}
            <div
              onClick={() => toggleRule(rule)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 cursor-pointer transition transform active:scale-95 ${rule.enabled ? 'bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20' : 'bg-slate-200 text-slate-400'}`}
            >
              {rule.enabled ? <Zap size={24} /> : <AlertTriangle size={24} />}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-bold text-slate-900">{rule.name}</h4>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">ID #{rule.id}</span>
              </div>

              <div className="flex gap-4 text-xs font-bold text-slate-600">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg border border-purple-100">
                  <MessageSquare size={14} /> {rule.trigger}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                  <Play size={14} /> {rule.action}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="text-center px-4 hidden md:block">
              <p className="text-xl font-bold text-slate-900">{(rule.executions || 0).toLocaleString()}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Runs</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => { setCurrentRule(rule); setFormData({ name: rule.name, trigger: rule.trigger, action: rule.action }); setIsModalOpen(true); }}
                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-200 transition shadow-sm"
              >
                <Settings size={18} />
              </button>
              <button onClick={() => { setCurrentRule(rule); setIsDeleteModalOpen(true); }} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-500 hover:text-red-600 hover:border-red-200 transition shadow-sm group-hover:bg-red-50">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rule Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentRule ? t('edit') : t('create_rule')}
        footer={(
          <button onClick={handleSaveRule} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl">{t('save_changes')}</button>
        )}
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rule Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Trigger Condition</label>
            <input type="text" value={formData.trigger} onChange={(e) => setFormData({ ...formData, trigger: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" placeholder="Comment contains 'price'" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Action to Perform</label>
            <input type="text" value={formData.action} onChange={(e) => setFormData({ ...formData, action: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" placeholder="Reply with Pricing DM" />
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t('delete_file')}
        footer={(
          <button onClick={handleDelete} className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-xl">Delete Rule</button>
        )}
      >
        <p className="text-slate-600 font-bold">Are you sure you want to delete this automation rule?</p>
      </Modal>
    </div>
  );
};

export default RulesEditor;
