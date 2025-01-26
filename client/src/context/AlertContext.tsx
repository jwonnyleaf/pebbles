import React, { createContext, useContext, useState } from 'react';
import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AlertContextType {
  showAlert: (title: string, description: string, danger: boolean) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<{
    title: string;
    description: string;
    danger?: boolean;
  } | null>(null);

  const showAlert = (title: string, description: string, danger: boolean) => {
    console.log(danger);
    setAlert({ title, description, danger: danger });

    setTimeout(() => {
      hideAlert();
    }, 4000);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && (
        <div className="fixed bottom-0 right-0 z-50 w-[15%] flex justify-center p-4 bg-transparent text-silver">
          <Alert className="bg-transparent gap-20 w-full">
            <Terminal className="h-6 w-3" color="white" />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
