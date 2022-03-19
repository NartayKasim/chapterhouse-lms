import classes from "./DefaultInput.module.css";

export interface InputProps {
   label?: string;
   name: string;
   placeholder?: string;
   value: string;
   type: string;
   onChange: (str: string) => void;
   direction?: string;
}

export default function DefaultInput({
   label,
   name,
   placeholder,
   value,
   type,
   onChange,
   direction,
}: InputProps) {
   return (
      <div
         className={classes.defaultInput}
         style={{
            display: "flex",
            flexDirection: direction === "column" ? "column" : "row",
         }}
      >
         <label className={classes.label} htmlFor={name}>
            {label}
         </label>
         <input
            className={classes.input}
            name={name}
            value={value}
            placeholder={placeholder}
            type={type}
            onChange={(e) => onChange(e.target.value)}
         />
      </div>
   );
}
