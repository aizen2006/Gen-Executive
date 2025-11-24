import React, { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';

interface CalButtonProps {
  label?: string;
  className?: string;
}

const CalButton: React.FC<CalButtonProps> = ({
  label = 'Book Strategy Call',
  className = '',
}) => {
  useEffect(() => {
    (async function initCal() {
      const cal = await getCalApi({ namespace: '30min' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  return (
    <button
      data-cal-namespace="30min"
      data-cal-link="abhik-halder/30min"
      data-cal-config='{"layout":"month_view"}'
      className={className}
      type="button"
    >
      {label}
    </button>
  );
};

export default CalButton;

