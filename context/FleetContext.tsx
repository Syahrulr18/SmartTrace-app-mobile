import React, { createContext, useContext, useState } from "react";

export interface Driver {
  id: string;
  name: string;
  phone: string;
  status: "Aktif" | "Maintenance" | "Idle";
}

export interface Fleet {
  id: string;
  name: string;
  driverName: string;
  driverPhone: string;
  driverId: string;
  status: "Aktif" | "Maintenance" | "Idle";
}

interface FleetContextType {
  fleets: Fleet[];
  drivers: Driver[];
  addFleet: (fleet: Fleet) => void;
  updateFleet: (id: string, updatedFleet: Partial<Fleet>) => void;
  deleteFleet: (id: string) => void;
  addDriver: (driver: Driver) => void;
  updateDriver: (id: string, updatedDriver: Partial<Driver>) => void;
  deleteDriver: (id: string) => void;
  getDriverById: (id: string) => Driver | undefined;
  getFleetsByDriver: (driverId: string) => Fleet[];
}

const FleetContext = createContext<FleetContextType | undefined>(undefined);

export const FleetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: "driver-001", name: "Budi Santoso", phone: "08123456789", status: "Aktif" },
    { id: "driver-002", name: "Doni Wijaya", phone: "08198765432", status: "Aktif" },
    { id: "driver-003", name: "Eko Prasetyo", phone: "08112345678", status: "Idle" },
  ]);

  const [fleets, setFleets] = useState<Fleet[]>([
    {
      id: "fleet-001",
      name: "Truck A - B 1234 CD",
      driverName: "Budi Santoso",
      driverPhone: "08123456789",
      driverId: "driver-001",
      status: "Aktif",
    },
    {
      id: "fleet-002",
      name: "Truck B - B 5678 EF",
      driverName: "Doni Wijaya",
      driverPhone: "08198765432",
      driverId: "driver-002",
      status: "Aktif",
    },
    {
      id: "fleet-003",
      name: "Truck C - L 9012 GH",
      driverName: "Eko Prasetyo",
      driverPhone: "08112345678",
      driverId: "driver-003",
      status: "Idle",
    },
  ]);

  const addFleet = (fleet: Fleet) => {
    setFleets([...fleets, fleet]);
  };

  const updateFleet = (id: string, updatedFleet: Partial<Fleet>) => {
    setFleets(
      fleets.map((fleet) =>
        fleet.id === id ? { ...fleet, ...updatedFleet } : fleet
      )
    );
  };

  const deleteFleet = (id: string) => {
    setFleets(fleets.filter((fleet) => fleet.id !== id));
  };

  const addDriver = (driver: Driver) => {
    setDrivers([...drivers, driver]);
  };

  const updateDriver = (id: string, updatedDriver: Partial<Driver>) => {
    setDrivers(
      drivers.map((driver) =>
        driver.id === id ? { ...driver, ...updatedDriver } : driver
      )
    );
  };

  const deleteDriver = (id: string) => {
    setDrivers(drivers.filter((driver) => driver.id !== id));
  };

  const getDriverById = (id: string) => {
    return drivers.find((driver) => driver.id === id);
  };

  const getFleetsByDriver = (driverId: string) => {
    return fleets.filter((fleet) => fleet.driverId === driverId);
  };

  return (
    <FleetContext.Provider
      value={{
        fleets,
        drivers,
        addFleet,
        updateFleet,
        deleteFleet,
        addDriver,
        updateDriver,
        deleteDriver,
        getDriverById,
        getFleetsByDriver,
      }}
    >
      {children}
    </FleetContext.Provider>
  );
};

export const useFleet = () => {
  const context = useContext(FleetContext);
  if (context === undefined) {
    throw new Error("useFleet must be used within a FleetProvider");
  }
  return context;
};
