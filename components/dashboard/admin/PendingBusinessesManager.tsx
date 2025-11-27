import React, { useState } from 'react';
import { 
  Store, Search, Filter, CheckCircle, XCircle, Eye, Mail, Phone,
  MapPin, Calendar, Star, Users, DollarSign, FileText, Download,
  RefreshCw, AlertCircle, Clock, Award, Shield, Smartphone, Monitor
} from 'lucide-react';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface PendingBusiness {
  id: string;
  name: string;
  type: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  description: string;
  logo?: string;
  submittedAt: string;
  status: 'pending' | 'reviewing' | 'rejected';
  documents: {
    commercialLicense: string;
    taxCard: string;
    ownerID: string;
  };
  priority: 'low' | 'normal' | 'high';
  notes?: string;
}

const initialPendingBusinesses: PendingBusiness[] = [
  {
    id: 'PND-001',
    name: 'مطعم الشرقية',
    type: 'restaurant',
    owner: 'محمود أحمد',
    email: 'mahmoud@sharqia.com',
    phone: '01012345678',
    address: '10 شارع النيل، القاهرة',
    city: 'القاهرة',
    description: 'مطعم متخصص في الأكلات الشرقية التقليدية',
    logo: '🍽️',
    submittedAt: '2024-11-25',
    status: 'pending',
    documents: {
      commercialLicense: 'CL-PND-001.pdf',
      taxCard: 'TC-PND-001.pdf',
      ownerID: 'ID-PND-001.pdf'
    },
    priority: 'high',
    notes: 'تحتاج التحقق من الرخصة التجارية'
  },
  {
    id: 'PND-002',
    name: 'متجر الملابس الحديثة',
    type: 'clothing',
    owner: 'فاطمة محمد',
    email: 'fatima@clothes.com',
    phone: '01098765432',
    address: '25 شارع الجمهورية، الجيزة',
    city: 'الجيزة',
    description: 'متجر متخصص في الملابس العصرية للرجال والنساء',
    logo: '👗',
    submittedAt: '2024-11-24',
    status: 'reviewing',
    documents: {
      commercialLicense: 'CL-PND-002.pdf',
      taxCard: 'TC-PND-002.pdf',
      ownerID: 'ID-PND-002.pdf'
    },
    priority: 'normal'
  },
  {
    id: 'PND-003',
    name: 'عيادة الأسنان المتقدمة',
    type: 'clinic',
    owner: 'د. علي محمد',
    email: 'ali@dental.com',
    phone: '01156789012',
    address: '5 شارع الأزهر، القاهرة',
    city: 'القاهرة',
    description: 'عيادة متخصصة في طب الأسنان الحديث',
    logo: '🦷',
    submittedAt: '2024-11-23',
    status: 'pending',
    documents: {
      commercialLicense: 'CL-PND-003.pdf',
      taxCard: 'TC-PND-003.pdf',
      ownerID: 'ID-PND-003.pdf'
    },
    priority: 'high'
  },
  {
    id: 'PND-004',
    name: 'صالون الجمال الفاخر',
    type: 'salon',
    owner: 'نور محمد',
    email: 'noor@salon.com',
    phone: '01234567890',
    address: '15 شارع الملك فهد، الرياض',
    city: 'الرياض',
    description: 'صالون متخصص في الجمال والعناية الشاملة',
    logo: '💄',
    submittedAt: '2024-11-22',
    status: 'pending',
    documents: {
      commercialLicense: 'CL-PND-004.pdf',
      taxCard: 'TC-PND-004.pdf',
      ownerID: 'ID-PND-004.pdf'
    },
    priority: 'normal'
  }
];

const PendingBusinessesManager: React.FC = () => {
  const [businesses, setBusinesses] = useState(initialPendingBusinesses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState<PendingBusiness | null>(null);

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || business.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || business.status === selectedStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setBusinesses(businesses.filter(b => b.id !== id));
    alert('تم قبول المحل بنجاح!');
  };

  const handleReject = (id: string) => {
    setBusinesses(businesses.map(b => 
      b.id === id ? { ...b, status: 'rejected' as const } : b
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'normal': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-blue-100 text-blue-700';
      case 'reviewing': return 'bg-orange-100 text-orange-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = {
    total: businesses.length,
    pending: businesses.filter(b => b.status === 'pending').length,
    reviewing: businesses.filter(b => b.status === 'reviewing').length,
    high: businesses.filter(b => b.priority === 'high').length,
  };

  return (
    <div className="w-full flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2 overflow-x-hidden">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="w-full lg:w-auto">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Store className="w-5 md:w-6 h-5 md:h-6 text-red-600" />
              المحلات والأنشطة الجديدة
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">مراجعة والموافقة على التسجيلات الجديدة</p>
          </div>
          
          <div className="flex gap-2 w-full lg:w-auto">
            <button className="flex items-center gap-2 bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors text-sm md:text-base flex-1 lg:flex-none justify-center">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">تصدير</span>
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm md:text-base flex-1 lg:flex-none justify-center">
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">تحديث</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-6 w-full">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.pending}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">قيد الانتظار</div>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.reviewing}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">قيد المراجعة</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.high}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">أولوية عالية</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col gap-4 w-full overflow-x-hidden">
        <div className="flex-1 relative w-full">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن محل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm md:text-base"
          />
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto w-full">
          {['all', 'high', 'normal', 'low'].map(priority => (
            <button 
              key={priority}
              onClick={() => setSelectedPriority(priority)}
              className={`px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition whitespace-nowrap
                ${selectedPriority === priority ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
              `}
            >
              {priority === 'all' ? 'كل الأولويات' : priority === 'high' ? 'عالية' : priority === 'normal' ? 'عادية' : 'منخفضة'}
            </button>
          ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto w-full">
          {['all', 'pending', 'reviewing', 'rejected'].map(status => (
            <button 
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition whitespace-nowrap
                ${selectedStatus === status ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
              `}
            >
              {status === 'all' ? 'كل الحالات' : status === 'pending' ? 'قيد الانتظار' : status === 'reviewing' ? 'قيد المراجعة' : 'مرفوضة'}
            </button>
          ))}
        </div>
      </div>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        {filteredBusinesses.map((business) => (
          <div key={business.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 md:p-6 shadow-sm hover:shadow-md transition-all w-full">
            <div className="flex justify-between items-start mb-4 gap-2">
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                {business.logo && (
                  <span className="text-xl md:text-2xl flex-shrink-0">{business.logo}</span>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm md:text-lg text-gray-800 dark:text-white truncate">{business.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">{business.id}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${getPriorityColor(business.priority)}`}>
                  {business.priority === 'high' ? 'عالية' : business.priority === 'normal' ? 'عادية' : 'منخفضة'}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${getStatusColor(business.status)}`}>
                  {business.status === 'pending' ? 'قيد الانتظار' : business.status === 'reviewing' ? 'قيد المراجعة' : 'مرفوضة'}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs md:text-sm text-gray-800 dark:text-gray-200 truncate">{business.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs md:text-sm text-gray-800 dark:text-gray-200">{business.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs md:text-sm text-gray-800 dark:text-gray-200 truncate">{business.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs md:text-sm text-gray-800 dark:text-gray-200">{business.submittedAt}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 w-full">
              <button 
                onClick={() => setShowDetailsModal(business)}
                className="flex-1 flex items-center justify-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-xs md:text-sm"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">عرض</span>
              </button>
              <button 
                onClick={() => handleApprove(business.id)}
                className="flex-1 flex items-center justify-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-xs md:text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">قبول</span>
              </button>
              <button 
                onClick={() => handleReject(business.id)}
                className="flex-1 flex items-center justify-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-xs md:text-sm"
              >
                <XCircle className="w-4 h-4" />
                <span className="hidden sm:inline">رفض</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              تفاصيل المحل: {showDetailsModal.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اسم المالك</label>
                <p className="text-gray-800 dark:text-gray-200">{showDetailsModal.owner}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">نوع النشاط</label>
                <p className="text-gray-800 dark:text-gray-200">{showDetailsModal.type}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                <p className="text-gray-800 dark:text-gray-200">{showDetailsModal.email}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                <p className="text-gray-800 dark:text-gray-200">{showDetailsModal.phone}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الوصف</label>
                <p className="text-gray-800 dark:text-gray-200">{showDetailsModal.description}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  handleApprove(showDetailsModal.id);
                  setShowDetailsModal(null);
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                قبول المحل
              </button>
              <button 
                onClick={() => {
                  handleReject(showDetailsModal.id);
                  setShowDetailsModal(null);
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                رفض المحل
              </button>
              <button 
                onClick={() => setShowDetailsModal(null)}
                className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg font-bold hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingBusinessesManager;
