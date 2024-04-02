const timer = () => {
  const [count, setCount] = React.useState(0);
  let timer;
  React.useEffect(() => {
    timerfn();
  }, [count]);

  const timerfn = () => {
    if (count > 0) {
      timer = setTimeout(() => {
        setCount(prev => prev - 1);
      }, 1000);
    }
  }

  const handlePause = () => {
    clearInterval(timer);
  }

  const handleResume = () => {
    timerfn();
  }

  const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay)
    }
  }

  const handleChange = debounce((e) => {
    setCount(e.target.value);
  },1000);

  return (
    <div className="container">
       <span className="count"><strong>{count}</strong></span>
      <div className="timer">
        <span><strong>Timer:</strong></span>
        <input type="text" onChange={handleChange} />
      </div>
      <div className="actionButton">
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleResume}>Resume</button>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(timer));
