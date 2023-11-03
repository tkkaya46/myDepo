import { Alert } from 'react-native';

const bicycleDatas = [
    { id: 1, model: 'ModelX', renk: 'mavi', konum: 'istanbul', derecelendirme: 4.5, müsaitlikDurumu: true },
    { id: 2, model: 'ModelY', renk: 'yeşil', konum: 'edirne', derecelendirme: 3.8, müsaitlikDurumu: false },
    { id: 3, model: 'ModelZ', renk: 'sarı', konum: 'trabzon', derecelendirme: 4.0, müsaitlikDurumu: true },
    { id: 4, model: 'ModelV', renk: 'turuncu', konum: 'ordu', derecelendirme: 5.0, müsaitlikDurumu: true },
  ];
  
  function bicycleDataSee() {
    try {
      if (bicycleDatas.length === 0) {
        Alert.alert('Bisiklet Verileri', 'Henüz bisiklet verisi yok.');
        return;
      }
  
      // verileri dönüp metin içeriğine aktarmak.
      const metinIcerik = bicycleDatas.map((bisiklet) => {
        return `Model: ${bisiklet.model}, Renk: ${bisiklet.renk}, Konum: ${bisiklet.konum}, Derecelendirme: ${bisiklet.derecelendirme}, Müsaitlik Durumu: ${bisiklet.müsaitlikDurumu ? 'Müsait' : 'Müsait Değil'}`;
      });
  
      // metin içeriğini birleştirip ekrana bastırmak.
      Alert.alert('Bisiklet Verileri', metinIcerik.join('\n'));
    } catch (error) {
      console.error('Bisiklet verilerini görüntüleme hatası:', error);
      Alert.alert('Hata', 'Bisiklet verilerini görüntülerken bir hata oluştu.');
    }
  }
  function bicycleRequest() {
    const musaitBisikletler = bicycleDatas.filter((bisiklet) => bisiklet.müsaitlikDurumu === true);
  
    if (musaitBisikletler.length > 0) {
      const secilenBisiklet = musaitBisikletler[0]; // seçilen bisikleti index içinden değiştirebilme.
  
      Alert.alert('Kiralama İsteği', `Müsait Bisikletler:\n${musaitBisikletler.map((b) => `${b.model} (${b.renk})`).join('\n')}\n\nSeçilen Bisiklet: Model: ${secilenBisiklet.model}, Renk: ${secilenBisiklet.renk}`);
  
    } else {
      Alert.alert('Hata', 'Müsait bisiklet bulunamadı.');
    }
  }
  
  export { bicycleDatas, bicycleDataSee, bicycleRequest };
  