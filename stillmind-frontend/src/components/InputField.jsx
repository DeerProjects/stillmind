const InputFields = ({ type = "text", placeholder, value, onChange }) => (
    <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="p-2 rounded w-full mb-4 bg-white text-black"
    />
);

export default InputFields;