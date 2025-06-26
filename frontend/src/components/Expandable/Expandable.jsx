// src/components/Expandable/Expandable.jsx
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Expandable.module.scss';

const transition = { duration: 0.1 };

const defaultVariants = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 }
};

export default function Expandable({ isOpen, children, variants = defaultVariants, className = '' }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="expandable"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={transition}
          className={styles.expandable}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
