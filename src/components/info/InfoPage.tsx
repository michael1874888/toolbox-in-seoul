import { flightsData } from '../../data/flights';
import { hotelData, meetupInfo } from '../../data/hotel';
import { CopyButton } from '../schedule/CopyButton';
import { NaverMapLink } from '../schedule/NaverMapLink';
import styles from './InfoPage.module.css';

export function InfoPage() {
  return (
    <div className={styles.page}>
      {/* Meetup */}
      <div className={styles.meetup}>
        <div className={styles.meetupLine}>📍 會合時間：{meetupInfo.date} {meetupInfo.time}</div>
        <div className={styles.meetupLine}>📍 會合地點：{meetupInfo.location}</div>
        <div className={styles.meetupNote}>{meetupInfo.note}</div>
      </div>

      {/* Flights */}
      <div>
        <div className={styles.sectionTitle}>✈️ 航班資訊</div>
        {flightsData.map(person => (
          <div key={person.person} className={styles.card} style={{ marginBottom: '10px' }}>
            <div className={styles.cardHeader}>{person.person}</div>
            <div className={styles.cardBody} style={{ padding: '8px 16px' }}>
              {person.flights.map((f, i) => (
                <div key={i} className={styles.flightRow}>
                  <span className={`${styles.flightDir} ${f.direction === 'outbound' ? styles.outbound : styles.inbound}`}>
                    {f.direction === 'outbound' ? '去' : '回'}
                  </span>
                  <div className={styles.flightInfo}>
                    <div className={styles.flightAirline}>{f.airline} · {f.date}</div>
                    <div className={styles.flightRoute}>
                      {f.departure.airport} T{f.departure.terminal} → {f.arrival.airport} T{f.arrival.terminal}
                    </div>
                  </div>
                  <div className={styles.flightTime}>
                    {f.departure.time}<br />
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>↓</span><br />
                    {f.arrival.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hotel */}
      <div>
        <div className={styles.sectionTitle}>🏨 飯店</div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>{hotelData.name_zh}</div>
          <div className={styles.cardBody}>
            <div className={styles.row}>
              <span className={styles.rowLabel}>韓文</span>
              <span className={styles.rowValue}>{hotelData.name_kr}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>地址</span>
              <span className={styles.rowValue}>{hotelData.address_kr}</span>
              <CopyButton text={hotelData.address_kr} label="複製" />
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>EN</span>
              <span className={styles.rowValue} style={{ fontSize: '12px' }}>{hotelData.address_en}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Check-in</span>
              <span className={styles.rowValue}>{hotelData.check_in}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Check-out</span>
              <span className={styles.rowValue}>{hotelData.check_out} 前</span>
            </div>
            <div className={styles.warning}>{hotelData.notes}</div>
            <div className={styles.nearbyList}>
              {hotelData.nearby.map(n => (
                <span key={n.name} className={styles.nearbyBadge}>{n.name} {n.distance}</span>
              ))}
            </div>
            <div className={styles.actions}>
              <NaverMapLink query={hotelData.naver_map_query} />
            </div>
          </div>
        </div>
      </div>

      {/* Day 1 Transport */}
      <div>
        <div className={styles.sectionTitle}>🚌 Day 1 機場交通比較</div>
        <div className={styles.card}>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>項目</th>
                  <th>機場巴士 6701</th>
                  <th>AREX 機場快線</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>搭乘時長</td><td>約 1.5 小時</td><td>約 1.5 小時</td></tr>
                <tr><td>票價</td><td>18,000 韓元<br/><span style={{color:'var(--color-text-muted)',fontSize:'11px'}}>~386 TWD</span></td><td>13,000 + 地鐵 1,550 韓元<br/><span style={{color:'var(--color-text-muted)',fontSize:'11px'}}>~278 TWD</span></td></tr>
                <tr><td>下車站</td><td>市廳<br/><span style={{fontSize:'11px',color:'var(--color-text-secondary)'}}>步行 4 分到飯店</span></td><td>首爾站→市廳站<br/><span style={{fontSize:'11px',color:'var(--color-text-secondary)'}}>+地鐵 9 分</span></td></tr>
                <tr><td>建議</td><td className={styles.highlight}>去市區（直達）</td><td>去機場（可先訂票）</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Day 5 Luggage */}
      <div>
        <div className={styles.sectionTitle}>🧳 Day 5 行李寄放比較</div>
        <div className={styles.card}>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>項目</th>
                  <th>T-Luggage</th>
                  <th>T-Locker</th>
                  <th>SAENU</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>金額 (6hr)</td><td>8,000 KRW</td><td>6,400 KRW</td><td>6,400 KRW</td></tr>
                <tr><td>約台幣</td><td>171 TWD</td><td>137 TWD</td><td>137 TWD</td></tr>
                <tr><td>方式</td><td>人工寄放</td><td>APP 付款</td><td>機台 + T-money</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Day 5 AREX schedule */}
      <div>
        <div className={styles.sectionTitle}>🚆 Day 5 AREX 回程班次</div>
        <div className={styles.card}>
          <div className={styles.tableWrapper}>
            <table className={styles.arexTable}>
              <thead>
                <tr><th>首爾站出發</th><th>T1 抵達</th><th>T2 抵達</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.highlight}>15:30</td>
                  <td>16:13</td>
                  <td>16:21</td>
                </tr>
                <tr>
                  <td>16:10</td>
                  <td>16:53</td>
                  <td>17:01</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ padding: '8px 16px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            票價 13,000 韓元（約 278 TWD）｜⚠️ Umi/HUA → T1，Ting → T2
          </div>
        </div>
      </div>
    </div>
  );
}
