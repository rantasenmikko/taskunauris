import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { updateDateTimeAtom } from '../atoms/dateTimeAtoms';
import { updateWorkTimeAtom } from '../atoms/workTimeAtoms';

/**
 * Custom hook to handle periodic timer updates for datetime and work time
 */
export const useTimerUpdates = () => {
  const updateDateTime = useSetAtom(updateDateTimeAtom);
  const updateWorkTime = useSetAtom(updateWorkTimeAtom);

  useEffect(() => {
    // Initial update
    updateDateTime();

    // Set up interval for real-time updates
    const timer = setInterval(() => {
      updateDateTime();
      updateWorkTime(); // Update work time as well
    }, 100); // Update more frequently for work time precision

    return () => clearInterval(timer);
  }, [updateDateTime, updateWorkTime]);
};