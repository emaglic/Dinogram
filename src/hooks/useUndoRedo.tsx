import { replaceChart, selectChart } from "@/state/Chart/chartSlice";
import {
  selectHistory,
  selectHistoryCurrentIndex,
  selectHistoryValues,
  updateHistory,
} from "@/state/Chart/settingsSlice";
import _ from "lodash";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useUndoRedo = (limit = 10) => {
  const chart = useSelector(selectChart);
  const { history, currentIndex } = useSelector(selectHistory);
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const isHistoryChange = useRef(false); // NEW: Track undo/redo actions

  const set = (value) => {
    let newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(value);

    if (newHistory.length > limit) {
      newHistory = newHistory.slice(newHistory.length - limit);
    }

    dispatch(
      updateHistory({
        history: newHistory,
        currentIndex: newHistory.length - 1,
      })
    );
  };

  const undo = () => {
    if (currentIndex > 0) {
      isHistoryChange.current = true; // Prevent loop
      const newIndex = Math.max(currentIndex - 1, 0);
      dispatch(updateHistory({ history, currentIndex: newIndex }));
      dispatch(replaceChart(history[newIndex]));
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      isHistoryChange.current = true; // Prevent loop
      const newIndex = Math.min(currentIndex + 1, history.length - 1);
      dispatch(updateHistory({ history, currentIndex: newIndex }));
      dispatch(replaceChart(history[newIndex]));
    }
  };

  useEffect(() => {
    console.log("chart changed");

    if (isHistoryChange.current) {
      isHistoryChange.current = false; // Reset flag after history update
      return;
    }

    if (
      history[currentIndex] !== chart &&
      !_.isEqual(history[currentIndex], chart)
    ) {
      set(chart);
    }
  }, [chart]); // Keep dependency minimal

  useEffect(() => {
    console.log("history", history);
    console.log("currentIndex", currentIndex);
  }, [history, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (inputRef.current !== document.activeElement) {
        if (event.ctrlKey && event.key === "z") {
          event.preventDefault();
          undo();
        } else if (event.ctrlKey && event.key === "y") {
          event.preventDefault();
          redo();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [redo, undo]);

  return [history[currentIndex], set, undo, redo, inputRef];
};

export default useUndoRedo;
