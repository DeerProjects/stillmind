const Button = ({ text, onClick, type = "button", style = {} }) => (
    <button
      type={type}
      onClick={onClick}
      className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
      style={style}
    >
      {text}
    </button>
  );
  
  export default Button;
  