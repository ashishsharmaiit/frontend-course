import { useEffect, useCallback } from 'react';

/**
 * Custom hook to trigger a function when the user scrolls near the bottom of the page.
 * @param onNearBottomCallback - Function to call when near bottom.
 * @param shouldFetch - Indicates if more content should be fetched.
 */
const useIncreaseScrollLength = (
  onNearBottomCallback: () => void,
  shouldFetch: boolean
): void => {
  // Function to check if the user is near the bottom of the page
  const isNearBottom = useCallback((): boolean => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    return scrollTop + clientHeight > scrollHeight - 500;
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      if (isNearBottom() && shouldFetch) {
        console.log("Near bottom, Triggering The function.");
        onNearBottomCallback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNearBottom, shouldFetch, onNearBottomCallback]);
};

export default useIncreaseScrollLength;
