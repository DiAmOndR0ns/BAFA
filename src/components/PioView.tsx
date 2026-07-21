import React, { useState } from 'react';
import { Announcement } from '../types';
import { Megaphone, Plus, Trash2, Calendar, Shield, Tag, AlertTriangle, CloudSun, DollarSign } from 'lucide-react';

interface PioViewProps {
  announcements: Announcement[];
  onAddAnnouncement: (ann: Omit<Announcement, 'id' | 'datePosted'>) => void;
  onDeleteAnnouncement: (id: string) => void;
}

export default function PioView({
  announcements,
  onAddAnnouncement,
  onDeleteAnnouncement
}: PioViewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'General' | 'Meeting' | 'Assistance' | 'Weather' | 'Price Advisory'>('General');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');

  const CATEGORIES = [
    { value: 'General', label: 'General Announcement' },
    { value: 'Meeting', label: 'Meeting Notice' },
    { value: 'Assistance', label: 'Farmer Assistance' },
    { value: 'Weather', label: 'Weather Warning' },
    { value: 'Price Advisory', label: 'Crop Price Advisory' }
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddAnnouncement({
      title,
      category,
      content,
      priority,
      postedBy: 'PIO (Ida S Manera)'
    });

    // Reset fields
    setTitle('');
    setContent('');
    setCategory('General');
    setPriority('Low');
    setShowAddModal(false);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Meeting':
        return <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'Assistance':
        return <Tag className="w-4 h-4 text-blue-400 shrink-0" />;
      case 'Weather':
        return <CloudSun className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'Price Advisory':
        return <DollarSign className="w-4 h-4 text-yellow-400 shrink-0" />;
      default:
        return <Megaphone className="w-4 h-4 text-slate-400 shrink-0" />;
    }
  };

  const getPriorityClass = (pri: string) => {
    switch (pri) {
      case 'High':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      default:
        return 'bg-slate-700/60 text-slate-300 border border-slate-700';
    }
  };

  return (
    <div id="pio-view-container" className="space-y-6">
      {/* PIO BANNER AND ACTION BUTTON */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700/65">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-emerald-400" />
            <span>PIO Communications Board</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Broadcast information, local prices, farm assistance programs, and weather safety bulletins.
          </p>
        </div>

        <button
          id="post-announcement-btn"
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-sm transition-all w-full sm:w-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Announcement</span>
        </button>
      </div>

      {/* ANNOUNCEMENT BOARD LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.length > 0 ? (
          announcements.map((ann) => (
            <div 
              key={ann.id} 
              className={`bg-slate-800 border rounded-2xl p-5 hover:border-slate-600 transition-all shadow-md flex flex-col justify-between ${
                ann.priority === 'High' ? 'border-red-500/15' : 'border-slate-700/50'
              }`}
            >
              <div>
                <div className="flex justify-between items-start gap-2 border-b border-slate-750 pb-2.5 mb-3.5">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(ann.category)}
                    <span className="text-xs text-slate-400 font-medium">
                      {ann.category}
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getPriorityClass(ann.priority)}`}>
                    {ann.priority} Priority
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{ann.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Posted: {ann.datePosted}</p>

                <p className="text-sm text-slate-300 mt-3 whitespace-pre-line leading-relaxed">
                  {ann.content}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-750/70 flex justify-between items-center text-xs">
                <span className="text-slate-500">By: {ann.postedBy}</span>
                <button
                  id={`delete-ann-${ann.id}`}
                  onClick={() => onDeleteAnnouncement(ann.id)}
                  className="text-slate-500 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 transition-all shrink-0"
                  title="Delete Announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-slate-800 border border-slate-700/50 rounded-2xl p-8 text-center text-slate-500">
            No announcements posted on the board yet.
          </div>
        )}
      </div>

      {/* CREATE ANNOUNCEMENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900 px-5 py-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-white text-base">Post to Public Announcement Board</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handlePostSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Bulletin Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule of Seeds & Fertilizer Distribution"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-750 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category Type</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-750 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Priority Badge</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-750 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Announcement Content</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write clear, comprehensive details for the Barangay Alegria farming community..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-750 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 text-sm font-semibold bg-slate-700 hover:bg-slate-650 text-slate-200 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-sm transition-all"
                >
                  Publish Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
