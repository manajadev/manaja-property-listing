"use client";

import { useEffect } from 'react';

export default function PropertyDebug({ property }) {
  useEffect(() => {
    console.log('[PropertyDebug] ========================================');
    console.log('[PropertyDebug] property received:', property);
    console.log('[PropertyDebug] property.id:', property?.id);
    console.log('[PropertyDebug] property keys:', property ? Object.keys(property) : 'none');
    console.log('[PropertyDebug] ========================================');
  }, [property]);

  return null;
}
