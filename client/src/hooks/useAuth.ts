import { useAppDispatch } from "hooks";
import { useCallback } from "react";
import { logout as logoutSlice } from "reducers/authSlice";
import { clearCharacters } from "reducers/characterSlice";
import { clearPromotion } from "reducers/promotionSlice";
import { clearSchool } from "reducers/schoolSlice";
import { clearSubject } from "reducers/subjectSlice";
import authService from "services/auth.service";

export default function useAuth() {
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(clearCharacters());
    dispatch(clearPromotion());
    dispatch(clearSchool());
    dispatch(clearSubject());
    dispatch(logoutSlice(authService.logout()));
  }, [dispatch]);

  return {
    logout,
  };
}
