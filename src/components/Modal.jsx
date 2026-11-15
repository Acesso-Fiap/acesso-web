import { useEffect, useRef } from "react";
import { X } from "lucide-react";
export default function Modal({ title, onClose, children, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    return () => {
      dialog.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`m-auto max-h-[88dvh] w-[min(620px,calc(100%-28px))] overflow-auto rounded-[26px] border border-[#cad2ec] bg-[#fffefa] p-7.5 text-ink shadow-2xl backdrop:bg-ink/45 backdrop:backdrop-blur-sm max-[760px]:rounded-[22px] max-[760px]:p-5.5   ${wide ? "w-[min(800px,calc(100%-28px))]!" : ""}`}
      aria-labelledby="modal-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="mb-5 flex items-start justify-between gap-3.75 border-b border-[#dfe4ef] pb-4.75">
        <h2
          id="modal-title"
          className="text-[27px] leading-tight font-[550] tracking-[-1px] max-[760px]:text-[23px]"
        >
          {title}
        </h2>
        <button
          className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e9edfc]"
          aria-label="Fechar janela"
          onClick={onClose}
        >
          <X size={23} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
