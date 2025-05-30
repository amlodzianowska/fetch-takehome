import type { ActionButtonsProps } from "./types";

function ActionButtons({ hasChanges, onCancel, onApply }: ActionButtonsProps) {
  if (!hasChanges) {
    return null;
  }

  return (
    <div className="mt-4 flex justify-end space-x-2">
      <button
        onClick={onCancel}
        className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
      >
        Cancel
      </button>
      <button
        onClick={onApply}
        className="px-3 py-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-md shadow-sm"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default ActionButtons;
