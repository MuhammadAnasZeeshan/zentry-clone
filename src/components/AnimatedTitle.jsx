import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import gsap from "gsap";

const AnimatedTitle = ({ title = "", containerClass = "" }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Define animations here if needed
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: '100 bottom',
                    end: 'center bottom',
                    toggleActions: 'play none none reverse',
                },
            });
        }, containerRef);

        return () => ctx.revert(); // Clean up GSAP context
    }, []);

    // Ensure title is a valid string
    const formattedTitle = typeof title === 'string' ? title : "";

    return (
        <div className={`animated-title ${containerClass}`} ref={containerRef}>
            {formattedTitle.split('<br />').map((line, index) => (
                <div
                    key={index}
                    className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
                >
                    {line.split(' ').map((word, i) => (
                        <span
                            key={i}
                            className="animated-word"
                            dangerouslySetInnerHTML={{ __html: word }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

// Add PropTypes validation
AnimatedTitle.propTypes = {
    title: PropTypes.string,
    containerClass: PropTypes.string,
};

export default AnimatedTitle;