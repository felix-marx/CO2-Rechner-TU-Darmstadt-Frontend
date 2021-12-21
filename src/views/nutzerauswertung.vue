<template>
  <v-app>
    <line-chart :data="chartData" />
    <pie-chart :data="[['Blueberry', 44], ['Strawberry', 23]]" />
    <column-chart :data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]" />
    <bar-chart :data="[['X-Small', 5], ['Small', 27]]" />
    <area-chart :data="{'2017-01-01 00:00:00 -0800': 2, '2017-01-01 00:01:00 -0800': 5}" />
    <scatter-chart
      :data="[[174.0, 80.0], [176.5, 82.3]]"
      xtitle="Size"
      ytitle="Population"
    />
  </v-app>
</template>


<script>
export default{
    name: "Nutzerauswertung",
    data: () => ({
      chartData: [["Jan", 4], ["Feb", 2], ["Mar", 10], ["Apr", 5], ["May", 3]]
    }),
}
</script>