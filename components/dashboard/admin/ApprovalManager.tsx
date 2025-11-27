import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, Clock, AlertTriangle, User, Store, Package,
  Search, Filter, Eye, Calendar, Phone, Mail, MapPin, Star, Shield,
  CheckSquare, XSquare, RefreshCw, Bell, TrendingUp, Users, BarChart3
} from 'lucide-react';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface ApprovalRequest {
  id: string;
  type: 'business_registration' | 'customer_registration' | 'service_request' | 'order_approval';
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  businessName?: string;
  businessType?: string;
  businessAddress?: string;
  serviceType?: string;
  orderDetails?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  notes?: string;
  attachments?: string[];
}

const initialApprovalRequests: ApprovalRequest[] = [
  {
    id: 'APR-001',
    type: 'business_registration',
    requesterName: 'أحمد محمد السيد',
    requesterEmail: 'ahmed.restaurant@example.com',
    requesterPhone: '01234567890',
    businessName: 'مطعم الدار الذهبية',
    businessType: 'restaurant',
    businessAddress: '15 شارع الجامعة، القاهرة',
    priority: 'high',
    status: 'pending',
    submittedAt: '2024-11-26 10:30',
    notes: 'مطعم جديد يرغب في الانضمام للمنصة',
    attachments: ['commercial_license.pdf', 'tax_card.pdf']
  },
  {
    id: 'APR-002',
    type: 'customer_registration',
    requesterName: 'سارة أحمد خالد',
    requesterEmail: 'sarah.customer@example.com',
    requesterPhone: '01123456789',
    priority: 'medium',
    status: 'approved',
    submittedAt: '2024-11-26 09:15',
    reviewedBy: 'محمد إبراهيم',
    reviewedAt: '2024-11-26 11:20',
    notes: 'عميلة جديدة تم التحقق من بياناتها'
  },
  {
    id: 'APR-003',
    type: 'service_request',
    requesterName: 'محمد خالد عمر',
    requesterEmail: 'mohammed.plumbing@example.com',
    requesterPhone: '01012345678',
    businessName: 'خدمات السباكة المحترفة',
    businessType: 'plumbing',
    serviceType: 'emergency_plumbing',
    priority: 'urgent',
    status: 'under_review',
    submittedAt: '2024-11-26 08:45',
    notes: 'طلب خدمة طارئة للسباكة',
    attachments: ['service_request.pdf']
  },
  {
    id: 'APR-004',
    type: 'order_approval',
    requesterName: 'فاطمة علي حسن',
    requesterEmail: 'fatima.retail@example.com',
    requesterPhone: '01567890123',
    businessName: 'ملابس الأناقة',
    businessType: 'clothing',
    orderDetails: 'طلب توريد 500 قطعة ملابس شتوية',
    priority: 'medium',
    status: 'rejected',
    submittedAt: '2024-11-25 16:30',
    reviewedBy: 'عبدالله سالم',
    reviewedAt: '2024-11-26 09:00',
    rejectionReason: 'الكمية المطلوبة تتجاوز الحد المتاح حالياً',
    notes: 'يمكن إعادة الطلب بكمية أقل'
  },
  {
    id: 'APR-005',
    type: 'business_registration',
    requesterName: 'عبدالله سالم محمد',
    requesterEmail: 'abdullah.clinic@example.com',
    requesterPhone: '01234567891',
    businessName: 'عيادة الأمل الطبية',
    businessType: 'clinic',
    businessAddress: '25 شارع التحرير، الجيزة',
    priority: 'high',
    status: 'pending',
    submittedAt: '2024-11-26 11:00',
    notes: 'عيادة جديدة تتطلب موافقة سريعة',
    attachments: ['medical_license.pdf', 'clinic_photos.zip']
  }
];

const ApprovalManager: React.FC = () => {
  const [requests, setRequests] = useState(initialApprovalRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState<ApprovalRequest | null>(null);

  const types = ['all', 'business_registration', 'customer_registration', 'service_request', 'order_approval'];
  const statuses = ['all', 'pending', 'under_review', 'approved', 'rejected'];
  const priorities = ['all', 'low', 'medium', 'high', 'urgent'];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requesterEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || request.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || request.priority === selectedPriority;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'business_registration': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'customer_registration': return 'bg-green-100 text-green-700 border-green-200';
      case 'service_request': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'order_approval': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'business_registration': return 'تسجيل عمل';
      case 'customer_registration': return 'تسجيل عميل';
      case 'service_request': return 'طلب خدمة';
      case 'order_approval': return 'موافقة طلب';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'under_review': return 'bg-blue-100 text-blue-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return 'في الانتظار';
      case 'under_review': return 'قيد المراجعة';
      case 'approved': return 'موافق عليه';
      case 'rejected': return 'مرفوض';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'low': return 'bg-gray-100 text-gray-700';
      case 'medium': return 'bg-blue-100 text-blue-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'urgent': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch(priority) {
      case 'low': return 'منخفض';
      case 'medium': return 'متوسط';
      case 'high': return 'عالي';
      case 'urgent': return 'عاجل';
      default: return priority;
    }
  };

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved', reviewedBy: 'المدير', reviewedAt: new Date().toISOString() }
        : req
    ));
  };

  const handleReject = (requestId: string, reason: string) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected', reviewedBy: 'المدير', reviewedAt: new Date().toISOString(), rejectionReason: reason }
        : req
    ));
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    underReview: requests.filter(r => r.status === 'under_review').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    urgent: requests.filter(r => r.priority === 'urgent').length
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-orange-600" />
              إدارة الموافقات والطلبات
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">مراجعة والموافقة على طلبات التسجيل والخدمات</p>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-700 transition-colors">
              <Bell className="w-4 h-4" />
              تنبيهات جديدة
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي الطلبات</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">في الانتظار</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.underReview}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">قيد المراجعة</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.approved}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">موافق عليها</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.rejected}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">مرفوضة</div>
          </div>
          <div className="text-center p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.urgent}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">عاجلة</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن طلب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {types.map(type => (
             <button 
               key={type}
               onClick={() => setSelectedType(type)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedType === type ? 'bg-white dark:bg-gray-600 text-orange-700 dark:text-orange-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {type === 'all' ? 'كل الأنواع' : getTypeLabel(type)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {statuses.map(status => (
             <button 
               key={status}
               onClick={() => setSelectedStatus(status)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedStatus === status ? 'bg-white dark:bg-gray-600 text-orange-700 dark:text-orange-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {status === 'all' ? 'كل الحالات' : getStatusLabel(status)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {priorities.map(priority => (
             <button 
               key={priority}
               onClick={() => setSelectedPriority(priority)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedPriority === priority ? 'bg-white dark:bg-gray-600 text-orange-700 dark:text-orange-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {priority === 'all' ? 'كل الأولويات' : getPriorityLabel(priority)}
             </button>
           ))}
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{request.id}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{request.requesterName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTypeColor(request.type)}`}>
                  {getTypeLabel(request.type)}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityColor(request.priority)}`}>
                  {getPriorityLabel(request.priority)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {request.businessName && (
                <div className="flex items-center gap-3">
                  <Store className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-800 dark:text-gray-200">{request.businessName}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{request.requesterEmail}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{request.requesterPhone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{request.submittedAt}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(request.status)}`}>
                  {getStatusLabel(request.status)}
                </span>
              </div>

              {request.notes && (
                <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-300">{request.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setShowDetailsModal(request)}
                className="flex-1 flex items-center justify-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-bold">عرض</span>
              </button>
              
              {request.status === 'pending' && (
                <>
                  <button 
                    onClick={() => handleApprove(request.id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-bold">موافقة</span>
                  </button>
                  <button 
                    onClick={() => handleReject(request.id, 'غير مطابق للشروط')}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm font-bold">رفض</span>
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              تفاصيل الطلب: {showDetailsModal.id}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">نوع الطلب</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTypeColor(showDetailsModal.type)}`}>
                    {getTypeLabel(showDetailsModal.type)}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الأولوية</label>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityColor(showDetailsModal.priority)}`}>
                    {getPriorityLabel(showDetailsModal.priority)}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الحالة</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(showDetailsModal.status)}`}>
                    {getStatusLabel(showDetailsModal.status)}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">تاريخ التقديم</label>
                  <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.submittedAt}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الاسم</label>
                <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.requesterName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.requesterEmail}</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.requesterPhone}</p>
              </div>
              
              {showDetailsModal.businessName && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اسم العمل</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.businessName}</p>
                </div>
              )}
              
              {showDetailsModal.businessAddress && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">العنوان</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.businessAddress}</p>
                </div>
              )}
              
              {showDetailsModal.notes && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">ملاحظات</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.notes}</p>
                </div>
              )}
              
              {showDetailsModal.attachments && showDetailsModal.attachments.length > 0 && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">المرفقات</label>
                  <div className="space-y-2">
                    {showDetailsModal.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                        <Package className="w-4 h-4" />
                        {attachment}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {showDetailsModal.rejectionReason && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">سبب الرفض</label>
                  <p className="text-sm text-red-600 dark:text-red-400">{showDetailsModal.rejectionReason}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-6">
              <button 
                onClick={() => setShowDetailsModal(null)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                إغلاق
              </button>
              
              {showDetailsModal.status === 'pending' && (
                <>
                  <button 
                    onClick={() => {
                      handleApprove(showDetailsModal.id);
                      setShowDetailsModal(null);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
                  >
                    موافقة
                  </button>
                  <button 
                    onClick={() => {
                      handleReject(showDetailsModal.id, 'غير مطابق للشروط');
                      setShowDetailsModal(null);
                    }}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
                  >
                    رفض
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalManager;
