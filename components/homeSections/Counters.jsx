/*my-website > components > homeSection > Counters.jsx */
import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function CountersSection() {
  const { ref, inView } = useInView({ triggerOnce: false, rootMargin: '-50px 0px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1 }}
      style={{
        backgroundColor: '#F5F5F5',
        borderRadius: '30px',
        padding: '30px 20px',
        maxWidth: '1000px',
        margin: '40px auto',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <p style={{
          fontSize: 'clamp(2.5rem, 5vw, 6rem)',
          color: '#163853',
          margin: 0,
          fontFamily: 'Gloock-Regular',
        }}>
          {inView ? <CountUp start={0} end={73} duration={2.5} suffix="+" /> : '0'}
        </p>
        <p style={{
          fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
          color: '#C49E7D',
          margin: 0,
          fontFamily: 'IBMPlexArabic',
        }}>
          خدمة
        </p>
      </div>

      <div style={{ textAlign: 'center', margin: '10px' }}>
        <p style={{
          fontSize: 'clamp(2.5rem, 5vw, 6rem)',
          color: '#163853',
          margin: 0,
          fontFamily: 'Gloock-Regular',
        }}>
          {inView ? <CountUp start={0} end={16} duration={2.5} suffix="+" /> : '0'}
        </p>
        <p style={{
          fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
          color: '#C49E7D',
          margin: 0,
          fontFamily: 'IBMPlexArabic',
        }}>
          موظف
        </p>
      </div>

      <div style={{ textAlign: 'center', margin: '10px' }}>
        <p style={{
          fontSize: 'clamp(2.5rem, 5vw, 6rem)',
          color: '#163853',
          margin: 0,
          fontFamily: 'Gloock-Regular',
        }}>
          {inView ? <CountUp start={0} end={40} duration={2.5} suffix="+" /> : '0'}
        </p>
        <p style={{
          fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
          color: '#C49E7D',
          margin: 0,
          fontFamily: 'IBMPlexArabic',
        }}>
          متدرب
        </p>
      </div>
    </motion.section>
  );
}


