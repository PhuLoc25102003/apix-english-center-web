import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps extends Omit<React.ComponentProps<typeof Input>, "onChange"> {
  onChange?: (value: string) => void;
  debounceMs?: number;
}

export function SearchInput({
  className,
  placeholder = "Search...",
  onChange,
  debounceMs = 300,
  value: controlledValue,
  defaultValue = "",
  ...props
}: SearchInputProps) {
  const [value, setValue] = React.useState<string>(() => {
    if (controlledValue !== undefined) return String(controlledValue);
    return String(defaultValue);
  });

  // Track controlled values
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(String(controlledValue));
    }
  }, [controlledValue]);

  // Debounced callback
  React.useEffect(() => {
    if (!onChange) return;
    
    const handler = setTimeout(() => {
      onChange(value);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, onChange, debounceMs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="pl-9 bg-white/60 focus:bg-white placeholder:text-[#9CA3AF] text-sm"
        {...props}
      />
    </div>
  );
}
