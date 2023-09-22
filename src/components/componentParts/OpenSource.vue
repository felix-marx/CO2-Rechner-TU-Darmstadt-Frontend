<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-4"
        text
        v-bind="attrs"
        v-on="on"
      >
        <span class="mx-2">{{ $t('componentParts.OpenSource.Projektcode') }}</span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{ $t('componentParts.OpenSource.Projektcode') }}
      </v-card-title>
      <v-list-item>
        <v-list-item-content>
          <v-card elevation="0">
            {{ $t('componentParts.OpenSource.Text_0') }}<br>
            {{ $t('componentParts.OpenSource.Text_1') }}
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  {{ $t('componentParts.OpenSource.Website') }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <a
                    href="https://github.com/felix-marx/CO2-Rechner-TU-Darmstadt-Frontend"
                    target="_blank"
                  >{{ $t('componentParts.OpenSource.Github') }}</a>
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  {{ $t('componentParts.OpenSource.Backend') }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <a
                    href="https://github.com/Anhilly/co2-rechner-TU-Darmstadt-backend"
                    target="_blank"
                  >{{ $t('componentParts.OpenSource.Github') }}</a>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OpenSource",
  
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
