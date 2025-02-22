import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { doctors } from "@/assets/data/RecentlyViewed";
import UserListItem from "@/components/UserListItem";

type Doctor = {
  doctorId: string;
  firstName: string;
  lastName: string;
  department: string;
  ratings: number;
  imageUrl: string;
  about: string;
  reviews: {
    patientName: string;
    review: string;
  }[];
};

const Users = () => {
  const [users, setUsers] = useState<Doctor[]>([]);

  useEffect(() => {
    setUsers(doctors);
  }, []);

  return (
    <FlatList
      data={users}
      contentContainerStyle={{ gap: 5 }}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
};

export default Users;
