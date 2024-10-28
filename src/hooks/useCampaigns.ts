import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchCampaigns,
  createCampaign,
  updateCampaign,
  fetchCampaignMetrics,
  selectCampaign
} from '../store/slices/campaignsSlice';
import type { Campaign } from '../types';

export function useCampaigns() {
  const dispatch = useDispatch();
  const {
    campaigns,
    selectedCampaign,
    metrics,
    isLoading,
    error
  } = useSelector((state: RootState) => state.campaigns);

  const loadCampaigns = useCallback(async () => {
    try {
      await dispatch(fetchCampaigns()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const handleCreateCampaign = useCallback(async (data: any) => {
    try {
      await dispatch(createCampaign(data)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const handleUpdateCampaign = useCallback(async (id: string, data: Partial<Campaign>) => {
    try {
      await dispatch(updateCampaign({ id, data })).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const loadCampaignMetrics = useCallback(async (id: string) => {
    try {
      await dispatch(fetchCampaignMetrics(id)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const handleSelectCampaign = useCallback((campaign: Campaign | null) => {
    dispatch(selectCampaign(campaign));
  }, [dispatch]);

  return {
    campaigns,
    selectedCampaign,
    metrics,
    isLoading,
    error,
    loadCampaigns,
    createCampaign: handleCreateCampaign,
    updateCampaign: handleUpdateCampaign,
    loadCampaignMetrics,
    selectCampaign: handleSelectCampaign
  };
}