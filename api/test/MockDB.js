export default {

  upsertAnnotation: annotation => new Promise(resolve => {
    console.log('[MockDB] upsertAnnotation: ', annotation);
    resolve();
  }),

  deleteById: annotationId => new Promise(resolve => {
    console.log('[MockDB] deleteById: ', annotationId);
    resolve();
  }),

  findBySource: source => new Promise(resolve => {
    console.log('[MockDB] findBySource: ', source);
    resolve([]);
  })

}