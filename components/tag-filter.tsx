'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { getAllTags, getTagsByIds } from '@/lib/data/tags';

interface TagFilterProps {
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  onClearAll: () => void;
  availableTags?: string[]; // If provided, only show these tags
}

export function TagFilter({ selectedTags, onTagToggle, onClearAll, availableTags }: TagFilterProps) {
  const allTags = getAllTags();
  const tagsToShow = availableTags 
    ? allTags.filter(tag => availableTags.includes(tag.id))
    : allTags;

  const hasActiveFilters = selectedTags.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 min-h-[2rem]">
        <h3 className="text-sm font-medium text-muted-foreground">
          Filter by tags {hasActiveFilters && `(${selectedTags.length} active)`}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className={`h-8 px-2 text-xs ${hasActiveFilters ? '' : 'invisible pointer-events-none'}`}
        >
          <X className="mr-1 h-3 w-3" />
          Clear all
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tagsToShow.map(tag => {
          const isSelected = selectedTags.includes(tag.id);
          
          return (
            <Badge
              key={tag.id}
              variant={isSelected ? 'default' : 'outline'}
              className="cursor-pointer select-none transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: isSelected ? tag.color : 'transparent',
                borderColor: tag.color,
                color: isSelected ? 'white' : 'currentColor',
              }}
              onClick={() => onTagToggle(tag.id)}
            >
              {tag.name}
            </Badge>
          );
        })}
      </div>
      
      <div className="min-h-[1rem]">
        {hasActiveFilters ? (
          <p className="text-xs text-muted-foreground">
            Showing projects with <strong>all</strong> selected tags
          </p>
        ) : (
          <p className="text-xs text-muted-foreground opacity-0 select-none">
            Showing projects with all selected tags
          </p>
        )}
      </div>
    </div>
  );
}
