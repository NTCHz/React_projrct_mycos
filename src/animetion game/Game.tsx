import React, { useRef, useEffect } from 'react';
import Hero from './Hero';
import Boss from './Boss';
import Wizard from './wizard';
import Redhood from './redhood';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hero = useRef<Hero>(new Hero(-5, 440)); 
  const wizard = useRef<Wizard>(new Wizard(7, 440));
  const redhood = useRef<Redhood>(new Redhood(207, 440));
  
  // hero.current.boss = boss.current;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }

    // Initial resize
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    let lastTime = 0;

    function draw(timestamp: number) {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      if (!canvas || !ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw characters
      hero.current.update(deltaTime);
      wizard.current.update(deltaTime);
      redhood.current.update(deltaTime);

      hero.current.draw(ctx);
      wizard.current.draw(ctx);
      redhood.current.draw(ctx);

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 10;
      switch (e.key) {
        case 'ArrowLeft':
          hero.current.move('left', step);
          break;
        case 'ArrowRight':
          hero.current.move('right', step);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        hero.current.stop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="game-container">
      <div className="game-area">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Game;
