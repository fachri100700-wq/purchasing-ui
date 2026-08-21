import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingHorizontal: 35,
    paddingBottom: 30,
    fontSize: 8,
    fontFamily: "Helvetica",
    color: "#111827",
  },

  // =========================
  // HEADER
  // =========================

  documentTitle: {
    width: "55%",
    alignSelf: "center",
    border: "1px solid #111827",
    paddingVertical: 8,
    marginBottom: 18,
    textAlign: "center",
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  companyHeader: {
    border: "1px solid #111827",
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 1,
  },

  companyName: {
    width: "50%",
    fontWeight: "bold",
  },

  companyDocument: {
    width: "50%",
    textAlign: "right",
    fontWeight: "bold",
  },

  // =========================
  // INFORMATION
  // =========================

  informationContainer: {
    border: "1px solid #111827",
    padding: 8,
    marginBottom: 8,
  },

  informationRow: {
    flexDirection: "row",
    marginBottom: 5,
  },

  informationColumn: {
    width: "50%",
    flexDirection: "row",
  },

  label: {
    width: 65,
  },

  value: {
    fontWeight: "bold",
  },

  checkboxRow: {
    flexDirection: "row",
    marginTop: 2,
  },

  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },

  checkbox: {
    width: 10,
    height: 10,
    border: "1px solid #111827",
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxChecked: {
    fontSize: 8,
    fontWeight: "bold",
  },

  // =========================
  // ITEMS TABLE
  // =========================

  table: {
    borderTop: "1px solid #111827",
    borderLeft: "1px solid #111827",
  },

  tableRow: {
    flexDirection: "row",
  },

  tableHeader: {
    fontWeight: "bold",
    textAlign: "center",
  },

  cell: {
    borderRight: "1px solid #111827",
    borderBottom: "1px solid #111827",
    padding: 5,
    minHeight: 24,
    justifyContent: "center",
  },

  cellCenter: {
    textAlign: "center",
  },

  no: {
    width: "5%",
  },

  itemName: {
    width: "25%",
  },

  brand: {
    width: "18%",
  },

  quantity: {
    width: "7%",
  },

  unit: {
    width: "10%",
  },

  purpose: {
    width: "25%",
  },

  stock: {
    width: "10%",
  },

  // =========================
  // APPROVAL
  // =========================

  approvalSection: {
    marginTop: 15,
    borderTop: "1px solid #111827",
    borderLeft: "1px solid #111827",
  },

  approvalRow: {
    flexDirection: "row",
  },

  approvalCell: {
    width: "33.333%",
    minHeight: 105,
    borderRight: "1px solid #111827",
    borderBottom: "1px solid #111827",
    padding: 5,
    alignItems: "center",
  },

  approvalTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  approvalName: {
    marginTop: "auto",
    textAlign: "center",
    fontWeight: "bold",
  },

  approvalDate: {
    marginTop: 3,
    fontSize: 7,
  },

  pendingText: {
    marginTop: 25,
    color: "#6B7280",
    fontSize: 7,
  },

  // =========================
  // STAMP
  // =========================

  stamp: {
    width: 52,
    height: 52,
    border: "2px solid #166534",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  stampInner: {
    width: 42,
    height: 42,
    border: "1px solid #166534",
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  stampText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#166534",
  },

  stampSubText: {
    fontSize: 5,
    color: "#166534",
    marginTop: 1,
  },

  footer: {
    marginTop: 6,
    fontSize: 6,
    color: "#4B5563",
  },
});

interface SppItem {
  id: string;
  procurementItem: string;
  brandOrType: string;
  quantity: number;
  uom: string;
  intendedPurpose: string;
  stock?: string;
}

interface Approval {
  role: string;
  name: string;
  status: "approved" | "pending";
  approvedAt?: string;
}

const sppItems: SppItem[] = [
  {
    id: "1",
    procurementItem: "Air Fryer",
    brandOrType: "Mito",
    quantity: 1,
    uom: "Unit",
    intendedPurpose: "Untuk kebutuhan dapur",
    stock: "-",
  },
  {
    id: "2",
    procurementItem: "Rak Besi",
    brandOrType: "Steel",
    quantity: 2,
    uom: "Pcs",
    intendedPurpose: "Untuk kebutuhan gudang",
    stock: "-",
  },
  {
    id: "3",
    procurementItem: "AC",
    brandOrType: "Midea",
    quantity: 1,
    uom: "Unit",
    intendedPurpose: "Ruang kerja",
    stock: "-",
  },
];

const approvals: Approval[] = [
  {
    role: "Pemohon",
    name: "Fachrizal",
    status: "approved",
    approvedAt: "20 Juli 2026",
  },
  {
    role: "Kepala Divisi",
    name: "Nama Kepala Divisi",
    status: "approved",
    approvedAt: "20 Juli 2026",
  },
  {
    role: "Gudang",
    name: "Nama Gudang",
    status: "approved",
    approvedAt: "21 Juli 2026",
  },
  {
    role: "Kepala Purchasing",
    name: "Nama Kepala Purchasing",
    status: "approved",
    approvedAt: "22 Juli 2026",
  },
  {
    role: "Kepala Audit",
    name: "Nama Kepala Audit",
    status: "pending",
  },
  {
    role: "Direktur",
    name: "Nama Direktur",
    status: "pending",
  },
];

function Checkbox({
  checked,
  label,
}: {
  checked?: boolean;
  label: string;
}) {
  return (
    <View style={styles.checkboxItem}>
      <View style={styles.checkbox}>
        {checked && <Text style={styles.checkboxChecked}>✓</Text>}
      </View>

      <Text>{label}</Text>
    </View>
  );
}

function ApprovalStamp({
  approval,
}: {
  approval: Approval;
}) {
  return (
    <View style={styles.approvalCell}>
      <Text style={styles.approvalTitle}>
        {approval.role}
      </Text>

      {approval.status === "approved" ? (
        <>
          <View style={styles.stamp}>
            <View style={styles.stampInner}>
              <Text style={styles.stampText}>
                OK
              </Text>

              <Text style={styles.stampSubText}>
                APPROVED
              </Text>
            </View>
          </View>

          <Text style={styles.approvalName}>
            {approval.name}
          </Text>

          <Text style={styles.approvalDate}>
            {approval.approvedAt}
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.pendingText}>
            MENUNGGU PERSETUJUAN
          </Text>

          <Text style={styles.approvalName}>
            {approval.name}
          </Text>
        </>
      )}
    </View>
  );
}

export default function SppDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* TITLE */}

        <View style={styles.documentTitle}>
          <Text style={styles.title}>
            SPP
          </Text>

          <Text style={styles.subtitle}>
            (PERMINTAAN PEMBELIAN)
          </Text>
        </View>

        {/* COMPANY HEADER */}

        <View style={styles.companyHeader}>
          <Text style={styles.companyName}>
            PT. INTERNATIONAL LEATHER WORKS
          </Text>

          <Text style={styles.companyDocument}>
            PERMINTAAN PEMBELIAN
          </Text>
        </View>

        {/* INFORMATION */}

        <View style={styles.informationContainer}>
          <View style={styles.informationRow}>
            <View style={styles.informationColumn}>
              <Text style={styles.label}>Bagian</Text>
              <Text>: CG</Text>
            </View>

            <View style={styles.informationColumn}>
              <Text style={styles.label}>No</Text>
              <Text style={styles.value}>
                : SPP/2026/001
              </Text>
            </View>
          </View>

          <View style={styles.informationRow}>
            <View style={styles.informationColumn}>
              <Text style={styles.label}>Status</Text>

              <View style={styles.checkboxRow}>
                <Checkbox checked label="Biasa" />
                <Checkbox label="Mendesak" />
              </View>
            </View>

            <View style={styles.informationColumn}>
              <Text style={styles.label}>Tanggal</Text>
              <Text>: 20 Juli 2026</Text>
            </View>
          </View>

          <View style={styles.informationRow}>
            <View style={styles.informationColumn}>
              <Text style={styles.label}>Pembelian</Text>

              <View style={styles.checkboxRow}>
                <Checkbox checked label="Lokal" />
                <Checkbox label="Import" />
              </View>
            </View>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox
              checked
              label="Tidak Termasuk List Budget"
            />

            <Checkbox
              label="Pengajuan Melebihi Budget"
            />

            <Checkbox
              label="Sesuai Budget"
            />
          </View>
        </View>

        {/* ITEMS TABLE */}

        <View style={styles.table}>
          {/* TABLE HEADER */}

          <View style={styles.tableRow}>
            <View style={[styles.cell, styles.no]}>
              <Text style={styles.tableHeader}>No</Text>
            </View>

            <View style={[styles.cell, styles.itemName]}>
              <Text style={styles.tableHeader}>
                Nama Barang
              </Text>
            </View>

            <View style={[styles.cell, styles.brand]}>
              <Text style={styles.tableHeader}>
                Ukuran / Merk / Type
              </Text>
            </View>

            <View style={[styles.cell, styles.quantity]}>
              <Text style={styles.tableHeader}>
                Jumlah
              </Text>
            </View>

            <View style={[styles.cell, styles.unit]}>
              <Text style={styles.tableHeader}>
                Satuan
              </Text>
            </View>

            <View style={[styles.cell, styles.purpose]}>
              <Text style={styles.tableHeader}>
                Keperluan
              </Text>
            </View>

            <View style={[styles.cell, styles.stock]}>
              <Text style={styles.tableHeader}>
                Saldo Akhir
              </Text>
            </View>
          </View>

          {/* TABLE DATA */}

          {sppItems.map((item, index) => (
            <View
              key={item.id}
              style={styles.tableRow}
              wrap={false}
            >
              <View style={[styles.cell, styles.no]}>
                <Text style={styles.cellCenter}>
                  {index + 1}
                </Text>
              </View>

              <View style={[styles.cell, styles.itemName]}>
                <Text>{item.procurementItem}</Text>
              </View>

              <View style={[styles.cell, styles.brand]}>
                <Text>{item.brandOrType}</Text>
              </View>

              <View style={[styles.cell, styles.quantity]}>
                <Text style={styles.cellCenter}>
                  {item.quantity}
                </Text>
              </View>

              <View style={[styles.cell, styles.unit]}>
                <Text style={styles.cellCenter}>
                  {item.uom}
                </Text>
              </View>

              <View style={[styles.cell, styles.purpose]}>
                <Text>{item.intendedPurpose}</Text>
              </View>

              <View style={[styles.cell, styles.stock]}>
                <Text style={styles.cellCenter}>
                  {item.stock || "-"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* APPROVAL SECTION */}

        <View style={styles.approvalSection}>
          <View style={styles.approvalRow}>
            {approvals.slice(0, 3).map((approval) => (
              <ApprovalStamp
                key={approval.role}
                approval={approval}
              />
            ))}
          </View>

          <View style={styles.approvalRow}>
            {approvals.slice(3, 6).map((approval) => (
              <ApprovalStamp
                key={approval.role}
                approval={approval}
              />
            ))}
          </View>
        </View>

        {/* FOOTER */}

        <Text style={styles.footer}>
          * Wajib diisi untuk barang-barang yang mempunyai saldo akhir.
        </Text>
      </Page>
    </Document>
  );
}