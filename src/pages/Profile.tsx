import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Loader';
import { User, Shield, Key, Mail, Building, Save, Camera, Upload, Link as LinkIcon, Sparkles, Check, RefreshCw } from 'lucide-react';

const PRESET_AVATARS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=250&auto=format&fit=crop&q=80', label: 'Classic Tech' },
  { id: 2, url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=80', label: 'Executive' },
  { id: 3, url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=250&auto=format&fit=crop&q=80', label: 'Cloud Engineer' },
  { id: 4, url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&auto=format&fit=crop&q=80', label: 'DevOps Lead' },
  { id: 5, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80', label: 'Solutions Architect' },
  { id: 6, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80', label: 'Security Admin' },
  { id: 7, url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=250&auto=format&fit=crop&q=80', label: 'Fullstack Dev' },
  { id: 8, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=250&auto=format&fit=crop&q=80', label: 'Data Engineer' },
];

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name || '');
  const [department, setDepartment] = useState(user?.department || 'DevOps Engineering');
  const [avatar, setAvatar] = useState(user?.avatar || PRESET_AVATARS[0].url);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Photo mode: 'preset' | 'file' | 'url'
  const [photoMode, setPhotoMode] = useState<'preset' | 'file' | 'url'>('preset');
  const [customUrl, setCustomUrl] = useState('');
  const [showPhotoSelector, setShowPhotoSelector] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setDepartment(user.department || 'DevOps Engineering');
      setAvatar(user.avatar || PRESET_AVATARS[0].url);
    }
  }, [user]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP).', 'error');
      return;
    }

    // Limit to ~3MB
    if (file.size > 3 * 1024 * 1024) {
      showToast('Image size should be under 3MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setAvatar(result);
        showToast('Photo uploaded! Click "Save Profile Changes" to apply.', 'info');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    setAvatar(customUrl.trim());
    showToast('Custom photo URL applied! Save changes to finalize.', 'info');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload: any = { name, department, avatar };
    if (password) payload.password = password;

    const res = await updateProfile(payload);
    setIsSubmitting(false);
    if (res.success) {
      showToast('Profile and avatar updated successfully.', 'success');
      setPassword('');
      setShowPhotoSelector(false);
    } else {
      showToast(res.error || 'Update failed', 'error');
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <User className="w-6 h-6 text-indigo-400" /> User Profile & Photo Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize your profile picture, enterprise department role, and security credentials.
        </p>
      </div>

      <Card>
        {/* Header Profile Section with Avatar Change Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <img
                src={avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full ring-4 ring-indigo-500/30 object-cover shadow-xl bg-slate-950"
              />
              <button
                type="button"
                onClick={() => setShowPhotoSelector(!showPhotoSelector)}
                className="absolute inset-0 rounded-full bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-medium gap-1 backdrop-blur-sm cursor-pointer"
                title="Change Profile Photo"
              >
                <Camera className="w-5 h-5 text-indigo-300" />
                <span>Change</span>
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-100">{user.name}</h2>
              </div>
              <p className="text-xs text-slate-400">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={user.role === 'admin' ? 'danger' : user.role === 'manager' ? 'warning' : 'info'}>
                  {user.role.toUpperCase()}
                </Badge>
                <Badge variant="success">ACTIVE SESSION</Badge>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant={showPhotoSelector ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowPhotoSelector(!showPhotoSelector)}
            icon={<Camera className="w-4 h-4 text-indigo-400" />}
          >
            {showPhotoSelector ? 'Close Photo Options' : 'Change Profile Photo'}
          </Button>
        </div>

        {/* Profile Photo Selector Panel */}
        {showPhotoSelector && (
          <div className="mb-8 p-5 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Select or Upload Profile Photo
              </h3>
              <span className="text-[10px] text-slate-500">Live preview updated instantly</span>
            </div>

            {/* Photo Option Tabs */}
            <div className="flex border-b border-slate-800 gap-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPhotoMode('preset')}
                className={`pb-2 transition-colors flex items-center gap-1.5 ${
                  photoMode === 'preset'
                    ? 'border-b-2 border-indigo-500 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Preset Library
              </button>

              <button
                type="button"
                onClick={() => setPhotoMode('file')}
                className={`pb-2 transition-colors flex items-center gap-1.5 ${
                  photoMode === 'file'
                    ? 'border-b-2 border-indigo-500 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Upload className="w-3.5 h-3.5" /> Upload File
              </button>

              <button
                type="button"
                onClick={() => setPhotoMode('url')}
                className={`pb-2 transition-colors flex items-center gap-1.5 ${
                  photoMode === 'url'
                    ? 'border-b-2 border-indigo-500 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" /> Image URL
              </button>
            </div>

            {/* Mode 1: Presets Gallery */}
            {photoMode === 'preset' && (
              <div className="space-y-2">
                <p className="text-[11px] text-slate-400">Choose from curated enterprise avatars:</p>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 pt-1">
                  {PRESET_AVATARS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAvatar(item.url)}
                      className={`relative group rounded-full overflow-hidden p-0.5 transition-all ${
                        avatar === item.url
                          ? 'ring-2 ring-indigo-500 scale-105 shadow-lg shadow-indigo-500/20'
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                      title={item.label}
                    >
                      <img
                        src={item.url}
                        alt={item.label}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {avatar === item.url && (
                        <div className="absolute inset-0 bg-indigo-600/40 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mode 2: Local File Upload */}
            {photoMode === 'file' && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-400">
                  Select a photo from your device (PNG, JPG, GIF, WEBP up to 3MB):
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-800 hover:border-indigo-500/60 bg-slate-900/50 p-6 rounded-xl text-center cursor-pointer transition-colors group"
                >
                  <Upload className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 mx-auto mb-2 transition-colors" />
                  <p className="text-xs font-semibold text-slate-200">
                    Click to browse or drag & drop photo here
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">Supports PNG, JPG, WEBP formats</p>
                </div>
              </div>
            )}

            {/* Mode 3: Image URL Input */}
            {photoMode === 'url' && (
              <form onSubmit={handleApplyCustomUrl} className="space-y-3">
                <p className="text-[11px] text-slate-400">Paste a direct web link to your avatar photo:</p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                  <Button type="submit" size="sm">
                    Apply URL
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Profile Details Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Email Address (Read-only)</label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full bg-slate-950/60 border border-slate-800/60 text-slate-500 rounded-xl px-3.5 py-2.5 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Avatar Image URL</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Change Password (Optional)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" isLoading={isSubmitting} icon={<Save className="w-4 h-4" />}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

