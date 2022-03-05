<template>
  <svg :class="dimensions" :fill="fillColor" :stroke="color" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="path" />
  </svg>
</template>
<script>
export default {
  name: 'SVGIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 6,
      required: false,
    },
    width: {
      type: Number,
      default: 6,
      required: false,
    },
    color: {
      type: String,
      default: '#BFBFBF',
      required: false,
    },
    fillColor: {
      type: String,
      default: 'none',
      required: false,
    },
  },
  data() {
    return {
      path: '',
      dimensions: '',
    };
  },
  mounted() {
    this.selectIcon();
    this.dimensionClasses();
  },
  methods: {
    dimensionClasses() {
      let height = 'h-6';
      let width = 'w-6';
      if (this.height) {
        height = `h-${this.height}`;
      }
      if (this.width) {
        width = `w-${this.width}`;
      }
      this.dimensions = [height, width].join(' ');
    },
    selectIcon() {
      switch (this.name) {
        case 'share':
          this.path = 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z';
          break;
        case 'home':
          this.path = 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6';
          break;
        case 'plus':
          this.path = 'M12 6v6m0 0v6m0-6h6m-6 0H6';
          break;
        case 'circle-check':
          this.path = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
          break;
        case 'chevron-down':
          this.path = 'M19 9l-7 7-7-7';
          break;
        case 'search':
          this.path = 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z';
          break;
        case 'heart':
          this.path = 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z';
          break;
        case 'pencil':
          this.path = 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z';
          break;
        case 'x-circle':
          this.path = 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
          break;
        case 'file-download':
          this.path = 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
          break;        
        case 'adjustments':
          this.path = 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4';
          break;
        case 'upload':
          this.path = 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12';
          break;
        case 'trash':
          this.path = 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16';
          break;        
        default:
          this.path = '';
      }
    },
  },
};
</script>
