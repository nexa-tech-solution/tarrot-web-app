const MysticalBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-30 animate-pulse-slow"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/64/56/a1/6456a1ea21f4f08401a4a18b58a3c199.gif')",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#090514] via-[#13131f]/90 to-[#090514]" />
  </div>
);

export default MysticalBackground;
