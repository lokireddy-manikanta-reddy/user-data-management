
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/user';

interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
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
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border border-gray-200 hover:border-blue-300"
      onClick={() => onClick(user)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-16 w-16 ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-200">
            <AvatarImage 
              src={getAvatarUrl(user.id)} 
              alt={user.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2 w-full">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">{user.email}</p>
            <p className="text-xs text-gray-500">@{user.username}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="text-xs">
              ID: {user.id}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {user.company.name}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
