import { View, Text, ScrollView } from "react-native";
import api from "../utils/api";
import { useEffect, useState, Fragment, useMemo } from "react";
import { WeeklyHeatMap } from "@symbiot.dev/react-native-heatmap";
import { RadarChart } from "@salmonco/react-native-radar-chart";
import { SafeAreaView } from "react-native-safe-area-context";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
type HeatMapColor = {
  headerTextColor?: string;
  cellDefaultColor?: string;
  cellTextColor?: string | Record<number, string>;
  cellColor?: Record<number, string>;
  sidebarTextColor?: string;
};

export default function Index() {
  const [transactions, setTransactions] = useState<any>({});
  const mint = {
    empty: "#161b22",
    level1: "#22577a",
    level2: "#38a3a5de",
    level3: "#57cc99ba",
    level4: "#80ed99b3",
  };

  const heatmapTheme: HeatMapColor = {
    cellColor: {
      1: mint.level1,
      6: mint.level2,
      11: mint.level3,
      16: mint.level4,
    },
    cellDefaultColor: mint.empty,
    cellTextColor: "#E2E8F0",
  };

  useEffect(() => {
    api
      .get(`/`) //1+ phone's ip
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  const data = [
    { label: "Groceries", value: 70 },
    { label: "Food", value: 100 },
    { label: "Shopping", value: 55 },
    { label: "Fuel", value: 70 },
    { label: "Others", value: 35 },
  ];

  const data3: Record<string, number> = useMemo(() => {
    const result: Record<string, number> = {};

    Object.entries(transactions).forEach(
      ([dateStr, dayData]: [string, any]) => {
        // 1. Transform "DD/MM/YYYY" to "YYYY-MM-DD"
        const [day, month, year] = dateStr.split("/");
        const formattedDate = `${year}-${month}-${day}`;

        // 2. Map to the length of the transactions array
        result[formattedDate] = dayData.transactions?.length || 0;
      },
    );

    return result;
  }, [transactions]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }} edges={["top"]}>
      <ScrollView
        contentContainerStyle={{
          padding: 10,
          backgroundColor: "#000",
          width: "100%",
          height: "100%",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "bold",
            alignSelf: "flex-start",
            marginBottom: 30,
            paddingLeft: 10,
          }}
        >
          Hi Ashish,
        </Text>
        <WeeklyHeatMap
          data={data3}
          pressable={true}
          cellText="count"
          isHeaderVisible={true}
          isCellTextVisible={true}
          // scrollable={false}
          // startDate={new Date("2026-02-18")}
          // endDate={new Date("2026-03-16")}
          cellTextFontSize={12}
          theme={heatmapTheme as any}
          isSidebarVisible={true}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            alignSelf: "flex-end",
            paddingRight: 10,
          }}
        >
          <Text style={{ color: "#8E9196", fontSize: 12, marginRight: 6 }}>
            Less
          </Text>
          {Object.values(mint)
            .slice(0, 5)
            .map((color, i) => (
              <View
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  backgroundColor: color,
                  marginHorizontal: 1.5,
                  borderWidth: 0.5,
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          <Text style={{ color: "#8E9196", fontSize: 12, marginLeft: 6 }}>
            More
          </Text>
        </View>
        <RadarChart
          data={data}
          gradientColor={{
            startColor: "#FF9432",
            endColor: "#FFF8F1",
            count: 4,
          }}
          stroke={["#FFE8D3", "#FFE8D3", "#FFE8D3", "#FFE8D3", "#ff9532"]}
          strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
          strokeOpacity={[1, 1, 1, 1, 0.13]}
          labelColor="#d5d5d5ff"
          labelDistance={1.25}
          dataFillColor="#FF9432"
          dataFillOpacity={0.8}
          dataStroke="salmon"
          dataStrokeWidth={2}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            alignSelf: "flex-end",
            paddingRight: 10,
          }}
        >
          {data.map((item, index) => (
            <View key={index}>
              <Text style={{ color: "#8E9196", fontSize: 12, marginRight: 6 }}>
                {item.label}
              </Text>
              <Text style={{ color: "#8E9196", fontSize: 12, marginRight: 6 }}>
                ₹ {item.value.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
