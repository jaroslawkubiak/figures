import { useState, useEffect, useRef } from "react";
import { BsCaretDownFill } from "react-icons/bs";
import Panel from "./Panel.js";

function Dropdown({
  cssClass,
  cssPanelClass,
  cssDropdownElement,
  name,
  onChange,
  options,
  placeholder,
  required,
  value,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // przypisujemy refenecje do zmiennej divEl = zmienna to obiekt!
  const divEl = useRef();

  useEffect(() => {
    const handler = event => {
      // sprawdzamy czy divEl w ogóle istnieje, czy nie jest ukryty
      if (!divEl.current) return;

      //sprawdzamy czy el który został kliknięty zawiera zapisany ref divEl
      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    const cleanUp = () => {
      document.removeEventListener("click", handler);
    };
    return cleanUp;
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option, name) => {
    //close dropdown
    setIsOpen(false);

    //what option uesr click
    onChange(option, name);
  };

  const renderedOptions = options.map(option => {
    return (
      <div
        className={cssDropdownElement}
        onClick={() => handleOptionClick(option, name)}
        key={option}
        name={name}
      >
        {option}
      </div>
    );
  });

  return (
    <div className="relative">
      <label className="add-figure-input-label">{children}</label>
      <div ref={divEl} className="input-wrapper">
        <Panel onClick={handleClick} className={cssClass}>
          {value || placeholder}

          <BsCaretDownFill className="icon-arrow-down" />
        </Panel>
        {required && <span className="input-required">#</span>}

        {isOpen && <Panel className={cssPanelClass}>{renderedOptions}</Panel>}
      </div>
    </div>
  );
}
//select-height
export default Dropdown;
