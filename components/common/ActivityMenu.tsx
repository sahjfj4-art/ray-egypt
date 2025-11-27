import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation, useGlobalSettings } from './GlobalSettings';
import { ACTIVITY_GROUPS, getActivitiesByGroup, ACTIVITIES, ActivityGroupData } from '../../types/activities';

interface ActivityMenuProps {
  onActivitySelect: (activityId: string) => void;
  selectedActivityId?: string;
}

/**
 * ActivityMenu - قائمة موحدة لجميع الأنشطة مجمعة حسب المجموعات
 * مع دعم البحث والفلترة
 */

const ActivityMenu: React.FC<ActivityMenuProps> = ({ onActivitySelect, selectedActivityId }) => {
  const t = useTranslation();
  const { currentLanguage } = useGlobalSettings();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['food']));
  const [searchQuery, setSearchQuery] = useState('');

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const filteredGroups = Object.entries(ACTIVITY_GROUPS).filter(([_, group]: [string, ActivityGroupData]) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      group.nameAr.toLowerCase().includes(query) ||
      group.nameEn.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder={currentLanguage === 'ar' ? 'ابحث عن نشاط...' : 'Search activities...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Activity Groups */}
      <div className="space-y-3">
        {filteredGroups.map(([groupId, group]) => {
          const activities = getActivitiesByGroup(groupId as any);
          const isExpanded = expandedGroups.has(groupId);

          return (
            <div key={groupId} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(groupId)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`${group.color} p-2 rounded-lg`}>
                    {/* Icon placeholder */}
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">{group.nameAr}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activities.length} نشاط</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Activities List */}
              {isExpanded && (
                <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                  {activities.map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => onActivitySelect(activity.id)}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition border-b border-gray-200 dark:border-gray-700 last:border-0 ${
                        selectedActivityId === activity.id ? 'bg-blue-50 dark:bg-blue-900' : ''
                      }`}
                    >
                      <div className={`${activity.color} p-2 rounded-lg`}>
                        <div className="w-4 h-4 bg-white rounded"></div>
                      </div>
                      <div className="text-right flex-1">
                        <p className={`font-bold ${selectedActivityId === activity.id ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`}>
                          {activity.nameAr}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.nameEn}</p>
                      </div>
                      {selectedActivityId === activity.id && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>{currentLanguage === 'ar' ? 'لم يتم العثور على أنشطة' : 'No activities found'}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityMenu;
