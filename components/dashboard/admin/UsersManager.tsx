import React, { useState } from 'react';
import { 
  Users, Shield, Plus, Search, Filter, Edit, Trash2, Eye, Key,
  Mail, Phone, Calendar, CheckCircle, AlertTriangle, Clock, Settings,
  UserPlus, UserMinus, Lock, Unlock, MailOpen, MessageSquare
} from 'lucide-react';
import { rayColors } from '../../common/RayHelpers';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'employee' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  businessType: string;
  lastLogin: string;
  createdAt: string;
  permissions: string[];
  avatar?: string;
  department?: string;
  location?: string;
  notes?: string;
}

const initialUsers: User[] = [
  {
    id: 'USR-001',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '01234567890',
    role: 'admin',
    status: 'active',
    businessType: 'general',
    lastLogin: 'منذ 5 دقائق',
    createdAt: '2024-01-15',
    permissions: ['all'],
    avatar: '👨‍💼',
    department: 'IT',
    location: 'القاهرة',
    notes: 'مدير النظام الرئيسي'
  },
  {
    id: 'USR-002',
    name: 'سارة أحمد',
    email: 'sarah@example.com',
    phone: '01123456789',
    role: 'manager',
    status: 'active',
    businessType: 'restaurant',
    lastLogin: 'منذ ساعة',
    createdAt: '2024-02-20',
    permissions: ['manage', 'reports', 'users'],
    avatar: '👩‍💼',
    department: 'المطاعم',
    location: 'الإسكندرية',
    notes: 'مديرة عمليات المطاعم'
  },
  {
    id: 'USR-003',
    name: 'محمد خالد',
    email: 'mohammed@example.com',
    phone: '01012345678',
    role: 'employee',
    status: 'active',
    businessType: 'plumbing',
    lastLogin: 'منذ 3 ساعات',
    createdAt: '2024-03-10',
    permissions: ['manage', 'orders'],
    avatar: '👷',
    department: 'الخدمات',
    location: 'الجيزة',
    notes: 'فني مواسير'
  },
  {
    id: 'USR-004',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    phone: '01567890123',
    role: 'customer',
    status: 'inactive',
    businessType: 'retail',
    lastLogin: 'منذ يوم',
    createdAt: '2024-04-05',
    permissions: ['view'],
    avatar: '👩‍🦰',
    department: 'العملاء',
    location: 'الأقصر',
    notes: 'عميلة منتظمة'
  },
  {
    id: 'USR-005',
    name: 'عبدالله سالم',
    email: 'abdullah@example.com',
    phone: '01234567891',
    role: 'manager',
    status: 'suspended',
    businessType: 'electrical',
    lastLogin: 'منذ 3 أيام',
    createdAt: '2024-05-12',
    permissions: ['manage', 'inventory'],
    avatar: '👨‍🔧',
    department: 'الكهرباء',
    location: 'المنصورة',
    notes: 'مدير قسم الكهرباء - موقوف مؤقتاً'
  }
];

const UsersManager: React.FC<{ view?: string }> = ({ view = 'users' }) => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const roles = ['all', 'admin', 'manager', 'employee', 'customer'];
  const statuses = ['all', 'active', 'inactive', 'suspended'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-red-100 text-red-700 border-red-200';
      case 'manager': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'employee': return 'bg-green-100 text-green-700 border-green-200';
      case 'customer': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch(role) {
      case 'admin': return 'مدير نظام';
      case 'manager': return 'مدير';
      case 'employee': return 'موظف';
      case 'customer': return 'عميل';
      default: return role;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'suspended': return 'موقوف';
      default: return status;
    }
  };

  const stats = {
    total: users.length,
    admin: users.filter(u => u.role === 'admin').length,
    manager: users.filter(u => u.role === 'manager').length,
    employee: users.filter(u => u.role === 'employee').length,
    customer: users.filter(u => u.role === 'customer').length,
    active: users.filter(u => u.status === 'active').length
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              {view === 'roles' ? 'إدارة الأدوار والمجموعات' : 'إدارة المستخدمين والصلاحيات'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {view === 'roles' ? 'تحديد صلاحيات الأدوار والمجموعات' : 'إدارة حسابات المستخدمين والصلاحيات'}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              {view === 'roles' ? 'دور جديد' : 'مستخدم جديد'}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.admin}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">مديري نظام</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.manager}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">مديرين</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.employee}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">موظفين</div>
          </div>
          <div className="text-center p-3 bg-gray-100 dark:bg-gray-600 rounded-lg">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">{stats.customer}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">عملاء</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">نشطين</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن مستخدم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {roles.map(role => (
             <button 
               key={role}
               onClick={() => setSelectedRole(role)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedRole === role ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {role === 'all' ? 'كل الأدوار' : getRoleLabel(role)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {statuses.map(status => (
             <button 
               key={status}
               onClick={() => setSelectedStatus(status)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedStatus === status ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {status === 'all' ? 'كل الحالات' : getStatusLabel(status)}
             </button>
           ))}
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {user.avatar && (
                    <span className="text-2xl">{user.avatar}</span>
                  )}
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">{user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.id}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleColor(user.role)}`}>
                  {getRoleLabel(user.role)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(user.status)}`}>
                  {getStatusLabel(user.status)}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button className="flex-1 flex items-center justify-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-bold">عرض</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <Edit className="w-4 h-4" />
                <span className="text-sm font-bold">تعديل</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <Trash2 className="w-4 h-4" />
                <span className="text-sm font-bold">حذف</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              {view === 'roles' ? 'إضافة دور جديد' : 'إضافة مستخدم جديد'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الاسم بالكامل</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="أدخل الاسم" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="email@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                <input type="tel" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="01xxxxxxxxx" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الدور</label>
                <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option value="admin">مدير نظام</option>
                  <option value="manager">مدير</option>
                  <option value="employee">موظف</option>
                  <option value="customer">عميل</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">نوع النشاط</label>
                <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option value="general">عام</option>
                  <option value="restaurant">مطاعم</option>
                  <option value="retail">محلات</option>
                  <option value="plumbing">مواسير</option>
                  <option value="electrical">كهرباء</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الحالة</label>
                <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                  <option value="suspended">موقوف</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">القسم</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="القسم" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الموقع</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="الموقع" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">ملاحظات</label>
                <textarea className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" rows={3} placeholder="ملاحظات إضافية"></textarea>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                إلغاء
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                {view === 'roles' ? 'إضافة دور' : 'إضافة مستخدم'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManager;
