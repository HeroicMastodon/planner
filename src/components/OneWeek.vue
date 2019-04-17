<template>

    <tr>
        <td>
            <one-day :events="sunday" />
        </td>
        <td>
            <one-day :events="monday" />
        </td>
        <td>
            <one-day :events="tuesday" />
        </td>
        <td>
            <one-day :events="wednesday" />
        </td>
        <td>
            <one-day :events="thursday" />
        </td>
        <td>
            <one-day :events="friday" />
        </td>
        <td>
            <one-day :events="saturday" />
        </td>
    </tr>

</template>

<script>
import OneDay from "@/components/OneDay.vue";

export default {
  name: 'OneWeek',
  props: {
    sunday: Array,
    monday: Array,
    tuesday: Array,
    wednesday: Array,
    thursday: Array,
    friday: Array,
    saturday: Array
  },
  methods: {

  },
  components: {
      OneDay
  }
}

</script>