import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

type TagSelectorProps = {
  availableTags: { id: string; name: string }[];
  selectedTags: Array<{ id: string; name: string }>;
  setSelectedTags: Dispatch<
    SetStateAction<Array<{ id: string; name: string }>>
  >;
};

const TagSelectorDropdown = ({
  availableTags,
  selectedTags,
  setSelectedTags,
}: TagSelectorProps) => {
  //   const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleTag = (tag: { id: string; name: string }) => {
    setSelectedTags((prev) =>
      prev.find((ele) => ele.id === tag.id)
        ? prev.filter((t) => t.id !== tag.id)
        : [...prev, tag]
    );

    console.log(selectedTags);
  };

  const isSelected = (tag: { id: string; name: string }) =>
    selectedTags.find((ele) => ele.id === tag.id);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-96">
      <div className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 my-4">
        Select Tags
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full text-left px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
        >
          {dropdownOpen ? "Hide Tags" : "Choose Tags"}
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 mt-2 w-full max-h-48 overflow-y-auto bg-black border border-gray-700 rounded-lg shadow-md">
            {availableTags.map((tag) => (
              <button
                key={tag?.id}
                onClick={() => toggleTag(tag)}
                className={`w-full text-left px-4 py-2 text-sm border-b border-gray-800 transition-colors ${
                  isSelected(tag)
                    ? "bg-blue-950 text-gray-300"
                    : "hover:bg-gray-800 text-white"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="my-4">
          <h3 className="text-lg font-medium mb-2">Selected Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center bg-blue-950 text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {tag.name}
                <button
                  onClick={() => toggleTag(tag)}
                  className="ml-2 text-xs hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelectorDropdown;
