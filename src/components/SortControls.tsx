
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { SortField, SortDirection } from '@/types/user';

interface SortControlsProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSortFieldChange: (field: SortField) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <Select value={sortField} onValueChange={(value) => onSortFieldChange(value as SortField)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onSortDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc')}
        className="flex items-center gap-1"
      >
        {sortDirection === 'asc' ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
        {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
      </Button>
    </div>
  );
};

export default SortControls;
