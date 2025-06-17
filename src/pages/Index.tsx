
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/services/userService';
import { User, SortField, SortDirection } from '@/types/user';
import UserCard from '@/components/UserCard';
import UserModal from '@/components/UserModal';
import SearchBar from '@/components/SearchBar';
import SortControls from '@/components/SortControls';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];

    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort users
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [users, searchTerm, sortField, sortDirection]);

  const handleUserClick = (user: User) => {
    console.log('User clicked:', user);
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertDescription>
            Failed to load users. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Directory</h1>
              <p className="mt-2 text-gray-600">
                Manage and explore user profiles
                {users && ` (${filteredAndSortedUsers.length} of ${users.length} users)`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="p-6 mb-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <SortControls
              sortField={sortField}
              sortDirection={sortDirection}
              onSortFieldChange={setSortField}
              onSortDirectionChange={setSortDirection}
            />
          </div>
        </Card>

        {/* Users Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3 mx-auto" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedUsers.map((user) => (
              <UserCard key={user.id} user={user} onClick={handleUserClick} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredAndSortedUsers.length === 0 && users && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <h3 className="text-lg font-medium mb-2">No users found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          </div>
        )}
      </div>

      {/* User Modal */}
      <UserModal
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
