import { CrossCircledIcon } from "@radix-ui/react-icons";
import { forwardRef } from "react";
import { cn } from "../../app/utils/cn";

type FormTextareaProps = React.ComponentProps<"textarea"> & {
  name: string;
  label: string;
  error?: string;
};

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ name, label, placeholder, error, id, className, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div>
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>

        <textarea
          id={inputId}
          className={cn(
            "min-h-[120px] w-full rounded-xl border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-blue-200",
            error ? "border-red-700" : "border-gray-300",
            className,
          )}
          placeholder={placeholder}
          name={name}
          ref={ref}
          {...props}
        />

        {error && (
          <div className="flex gap-2 items-center mt-2 text-red-700">
            <CrossCircledIcon />

            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  },
);
FormTextarea.displayName = "FormTextarea";
