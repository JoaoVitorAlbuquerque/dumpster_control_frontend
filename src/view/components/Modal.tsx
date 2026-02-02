import * as RdxDialog from '@radix-ui/react-dialog';

import { cn } from '../../app/utils/cn';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  title: string;
  rightAction?: React.ReactNode;
  onClose?(): void;
  hidden?: boolean;
  className?: string;
}

export function Modal({ open, title, children, rightAction, onClose, hidden, className }: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn(
            'fixed inset-0 bg-black/80 backdrop-blur-sm z-50',
            'data-[state=open]:animate-overlay-show',
          )}
          hidden={hidden}
        />

        <RdxDialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none',
            'data-[state=open]:animate-content-show transition-all',
            className,
          )}
        >
          <header className="h-12 flex items-center justify-between text-[#343a40]">
            <button
              className="h-12 w-12 flex items-center justify-center outline-none cursor-pointer"
              onClick={onClose}
            >
              <Cross2Icon className="w-6 h-6" />
            </button>

            <RdxDialog.Title className="w-full flex items-center justify-center">
              <span className="text-lg tracking-[-1px] font-bold">
                {title}
              </span>
            </RdxDialog.Title>
            <RdxDialog.Description />

            <div className="h-12 w-12 flex items-center justify-center">
              {rightAction}
            </div>
          </header>

          <div>
            {children}
          </div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
