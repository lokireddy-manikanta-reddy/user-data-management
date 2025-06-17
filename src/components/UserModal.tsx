
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types/user';

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarUrl = (id: number) => {
    return `https://i.pravatar.cc/150?img=${id}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">User Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20 ring-4 ring-blue-100">
              <AvatarImage 
                src={getAvatarUrl(user.id)} 
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">@{user.username}</p>
              <Badge variant="secondary" className="mt-2">
                ID: {user.id}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <p className="text-gray-600">{user.phone}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Website:</span>
                <p className="text-gray-600">{user.website}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Address */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Address</h3>
            <div className="text-sm text-gray-600">
              <p>{user.address.suite} {user.address.street}</p>
              <p>{user.address.city}, {user.address.zipcode}</p>
            </div>
          </div>

          <Separator />

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Company</h3>
            <div className="space-y-2">
              <p className="font-medium text-gray-800">{user.company.name}</p>
              <p className="text-sm text-gray-600 italic">"{user.company.catchPhrase}"</p>
              <p className="text-xs text-gray-500">{user.company.bs}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
