import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import classes from "./ModuleComposer.module.css";

interface ModuleComposerProps {
   moduleContent: string;
   onChange: (val: string) => void;
}

export default function ModuleComposer({
   moduleContent,
   onChange,
}: ModuleComposerProps) {
   return (
      <div className={classes.moduleComposer}>
         <ReactQuill
            modules={ModuleComposer.modules}
            formats={ModuleComposer.formats}
            className="quill--post"
            theme="snow"
            value={moduleContent}
            onChange={(val) => onChange(val)}
         />
      </div>
   );
}

ModuleComposer.modules = {
   toolbar: [
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
   ],
};

ModuleComposer.formats = [
   "header",
   "font",
   "size",
   "bold",
   "italic",
   "underline",
   "strike",
   "blockquote",
   "list",
   "bullet",
   "unordered",
   "link",
   "image",
   "video",
];
