import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";


export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2, // Duration of the animation in seconds
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  // Calculate damping and stiffness based on duration
  const damping = 20 + 40 * (1 / duration); // Adjust this formula for finer control
  const stiffness = 100 * (1 / duration); // Adjust this formula for finer control

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: true, margin: "0px" });

  // Set initial text content to the initial value based on direction
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(direction === "down" ? to : from);
    }
  }, [from, to, direction]);

  // Start the animation when in view and startWhen is true
  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") {
        onStart();
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === "function") {
            onEnd();
          }
        },
        delay * 1000 + duration * 1000
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
  ]);

  // Update text content with formatted number on spring value change
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formattedNumber = new Intl.NumberFormat("en-AU", {
          style: "currency",
          currency: "AUD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(latest);
  
        ref.current.textContent = formattedNumber;
      }
    });
  
    return () => unsubscribe();
  }, [springValue]);

  return <span className={`${className}`} ref={ref} />;
}