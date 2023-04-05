import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel.js";

function Dropdown({
  options,
  value,
  onChange,
  children,
  name,
  placeholder,
  required,
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
        className="dropdown-el"
        onClick={() => handleOptionClick(option, name)}
        key={option}
        name={name}
      >
        {option}
      </div>
    );
  });

  return (
    <>
      <label className="add-figure-input-label">{children}</label>
      <div ref={divEl} className="input-wrapper">
        <Panel onClick={handleClick} className="add-figure-input">
          {value || placeholder}

          <GoChevronDown className="icon-arrow-down" />
        </Panel>
        {required && <span className="input-required">#</span>}

        {isOpen && (
          <Panel className="add-figure-input select-height">
            {renderedOptions}
          </Panel>
        )}
      </div>
    </>
  );
}
//select-height
export default Dropdown;
