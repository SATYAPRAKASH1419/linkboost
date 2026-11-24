"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { validateUsername } from "../validation/authValidation";

export type UsernameCheckStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "error";

export interface UseUsernameAvailabilityReturn {
  status: UsernameCheckStatus;
  isAvailable: boolean;
  isChecking: boolean;
  errorMessage: string | null;
  checkUsernameNow: (value: string) => Promise<void>;
}

export function useUsernameAvailability(
  username: string,
  debounceMs: number = 380,
): UseUsernameAvailabilityReturn {
  const clean = username.toLocaleLowerCase().trim();
  const clientError = clean ? validateUsername(clean) : null;

  const [serverState, setServerState] = useState<{
    status: UsernameCheckStatus;
    errorMessage: string | null;
    checkedUsername: string;
  }>({
    status: "idle",
    errorMessage: null,
    checkedUsername: "",
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // If handle is empty or fails synchronous client validation, abort any ongoing requests
    if (!clean || clientError) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/auth/check-username?username=${encodeURIComponent(clean)}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setServerState({
            status: "error",
            errorMessage: body.error || "Could not verify username",
            checkedUsername: clean,
          });
          return;
        }

        const data = await res.json();
        if (data.available) {
          setServerState({
            status: "available",
            errorMessage: null,
            checkedUsername: clean,
          });
        } else {
          setServerState({
            status: "taken",
            errorMessage: data.error || "Username is already taken",
            checkedUsername: clean,
          });
        }
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;
        setServerState({
          status: "error",
          errorMessage: "Failed to connect to verification service",
          checkedUsername: clean,
        });
      }
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [clean, clientError, debounceMs]);

  const checkUsernameNow = useCallback(async (val: string) => {
    const valClean = val.toLowerCase().trim();
    const err = validateUsername(valClean);
    if (err) {
      setServerState({
        status: "error",
        errorMessage: err,
        checkedUsername: valClean,
      });
      return;
    }

    setServerState({
      status: "checking",
      errorMessage: null,
      checkedUsername: "",
    });

    try {
      const res = await fetch(
        `/api/auth/check-username?username=${encodeURIComponent(valClean)}`,
      );
      const data = await res.json();
      if (data.available) {
        setServerState({
          status: "available",
          errorMessage: null,
          checkedUsername: valClean,
        });
      } else {
        setServerState({
          status: "taken",
          errorMessage: data.error || "Username is already taken",
          checkedUsername: valClean,
        });
      }
    } catch {
      setServerState({
        status: "error",
        errorMessage: "Error checking handle availability",
        checkedUsername: valClean,
      });
    }
  }, []);

  // Compute status and errorMessage without synchronous setState inside useEffect
  let currentStatus: UsernameCheckStatus;
  let currentError: string | null;

  if (!clean) {
    currentStatus = "idle";
    currentError = null;
  } else if (clientError) {
    currentStatus = "error";
    currentError = clientError;
  } else if (serverState.checkedUsername === clean) {
    currentStatus = serverState.status;
    currentError = serverState.errorMessage;
  } else {
    currentStatus = "checking";
    currentError = null;
  }

  return {
    status: currentStatus,
    isAvailable: currentStatus === "available",
    isChecking: currentStatus === "checking",
    errorMessage: currentError,
    checkUsernameNow,
  };
}
