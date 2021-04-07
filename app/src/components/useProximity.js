import { useEffect, useState } from 'react';
import Proximity from 'react-native-proximity';

export default function useProximity() {
  const [hasProximity, setHasProximity] = useState(false);

  useEffect(() => {
    const callback = ({ proximity }) => setHasProximity(!!proximity);
    Proximity.addListener(callback);

    return () => Proximity.removeListener(callback);
  }, []);

  return { hasProximity };
}